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

        isCreateMode() {
            return !this.blogId && !this.blog?.id;
        },

        blogRepository() {
            return this.repositoryFactory.create('swag_blog');
        },

        categoryRepository() {
            return this.repositoryFactory.create('swag_blog_category');
        },

        categoryOptions() {
            return this.categories.map(cat => ({ value: cat.id, label: cat.name }));
        },

        mediaUploadTag() {
            return `sw-blog-detail--${this.blog?.id ?? 'new'}`;
        },

        ...mapPropertyErrors('blog', ['title', 'categoryId', 'author']),
    },

    created() {
        this.createdComponent();
    },

    methods: {
        async createdComponent() {
            await this.loadCategories();
            await this.loadEntity();
        },

        async loadCategories() {
            const criteria = new Criteria(1, 100);
            criteria.addSorting(Criteria.sort('name', 'ASC'));
            this.categories = await this.categoryRepository.search(criteria, Context.api);
        },

        async loadEntity() {
            this.isLoading = true;

            try {
                const criteria = new Criteria();
                criteria.addAssociation('mainImage');

                const entity = await this.blogRepository.get(this.blogId || this.$route.params.id, Context.api, criteria);
                if (entity) {
                    entity.errors = entity.errors || {};

                    if (entity.publishedAt && !(entity.publishedAt instanceof Date)) {
                        entity.publishedAt = new Date(entity.publishedAt);
                    } else if (!entity.publishedAt) {
                        entity.publishedAt = null;
                    }

                    this.blog = entity;
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

        onDropMedia(dragData) {
            this.onUploadMedia({ targetId: dragData.id, media: dragData });
        },

        onUnlinkLogo() {
            this.blog.mainImageId = null;
            this.blog.mainImage = null;
        },

        validateBlog() {
            this.blog.errors = {};
            let isValid = true;

            if (!this.blog.title || this.blog.title.trim() === '') {
                this.blog.errors.title = 'Title must not be empty';
                this.createNotificationError({ message: 'Please fill the Title field.' });
                isValid = false;
            }

            if (!this.blog.author || this.blog.author.trim() === '') {
                this.blog.errors.author = 'Author must not be empty';
                this.createNotificationError({ message: 'Please fill the Author field.' });
                isValid = false;
            }

            if (!this.blog.categoryId) {
                this.blog.errors.categoryId = 'Category must be selected';
                this.createNotificationError({ message: 'Please select a Category.' });
                isValid = false;
            }

            return isValid;
        },

        async onSave() {
            if (!this.validateBlog()) return;

            this.isLoading = true;

            try {
                await this.blogRepository.save(this.blog, Context.api);
                this.isSaveSuccessful = true;

                if (this.isCreateMode) {
                    this.createNotificationSuccess({ message: 'Blog created successfully.' });
                    this.$router.push({ name: 'swag.blog.detail', params: { id: this.blog.id } });
                } else {
                    this.createNotificationSuccess({ message: 'Blog updated successfully.' });
                }
            } catch (error) {
                console.error('Blog save failed:', error);
                this.createNotificationError({ message: 'Failed to save blog.' });
            } finally {
                this.isLoading = false;
            }
        },

        onCancel() {
            this.$router.push({ name: 'swag.blog.index' });
        },
    },
};
