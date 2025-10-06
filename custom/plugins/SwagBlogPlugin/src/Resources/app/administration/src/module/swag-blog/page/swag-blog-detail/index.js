import template from './swag-blog-detail.html.twig';
import './swag-blog-detail.scss';

const { Mixin, Data: { Criteria }, Context } = Shopware;
const { mapPropertyErrors } = Shopware.Component.getComponentHelper();

export default {
    template,

    compatConfig: Shopware.compatConfig,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('discard-detail-page-changes')('blog'),
    ],

    props: {
        blogId: {
            type: String,
            required: false,
            default: null,
        },
    },

    data() {
        return {
            blog: {
                title: '',
                description: '',
                categoryId: null,
                mainImageId: null,
                mainImage: null,
                errors: {},
                publishedAt: null,
            },
            categories: [],
            isLoading: false,
            isSaveSuccessful: false,
            showMediaModal: false,
        };
    },
    computed: {
        identifier() {
            return this.blog ? this.blog.title : '';
        },

        blogRepository() {
            return this.repositoryFactory.create('swag_blog');
        },

        categoryRepository() {
            return this.repositoryFactory.create('swag_blog_category');
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        categoryOptions() {
            return this.categories.map(cat => ({ value: cat.id, label: cat.name }));
        },

        mediaUploadTag() {
            return `sw-blog-detail--${this.blog.id ?? 'new'}`;
        },

        ...mapPropertyErrors('blog', ['title', 'categoryId']),
    },

    watch: {
        blogId() {
            this.createdComponent();
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.loadEntity();
            this.loadCategories();
        },

        async loadCategories() {
            const criteria = new Criteria(1, 100);
            criteria.addSorting(Criteria.sort('name', 'ASC'));
            this.categories = await this.categoryRepository.search(criteria, Context.api);
        },

        async loadEntity() {
            if (!this.$route.params.id) return;

            this.isLoading = true;
            try {
                const blog = await this.blogRepository.get(this.$route.params.id, Context.api, criteria);

                if (blog) {
                    this.blog = {
                        ...blog,
                        errors: {}, // ensure errors exists
                    };
                }
            } catch (error) {
                this.createNotificationError({ message: 'Failed to load blog data.' });
            } finally {
                this.isLoading = false;
            }
        },
        openMediaModal() {
            this.showMediaModal = true;
        },

        closeMediaModal() {
            this.showMediaModal = false;
        },

        onSelectMedia(selection) {
            if (!selection || selection.length === 0) return;

            const media = selection[0];
            this.blog.mainImageId = media.id;
            this.blog.mainImage = media;
            this.showMediaModal = false;
        },
        onUploadMedia({ targetId, media }) {
            this.blog.mainImageId = targetId;
            if (media) {
                this.blog.mainImage = media;
            }
        },

        onUnlinkLogo() {
            this.blog.mainImageId = null;
            this.blog.mainImage = null;
        },


        onDropMedia(dragData) {
            this.onUploadMedia({ targetId: dragData.id, media: dragData });
        },


        onSave() {
            if (!this.blog.title || this.blog.title.trim() === '') {
                this.blog.errors.title = 'Title must not be empty';
                this.createNotificationError({ message: 'Please fill the Title field.' });
                return;
            }

            this.isLoading = true;

            this.blogRepository.save(this.blog, Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.isSaveSuccessful = true;
                    this.createNotificationSuccess({ message: 'Blog updated successfully.' });
                })
                .catch(() => {
                    this.createNotificationError({ message: 'Failed to save blog.' });
                })
                .finally(() => { this.isLoading = false; });
        },

        onCancel() {
            this.$router.push({ name: 'swag.blog.index' });
        },
    },
};
