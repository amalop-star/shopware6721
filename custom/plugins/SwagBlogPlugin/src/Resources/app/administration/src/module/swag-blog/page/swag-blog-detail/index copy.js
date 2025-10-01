import template from './swag-blog-detail.html.twig';
const { Mixin, Data: { Criteria }, Context } = Shopware;

export default {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('notification'),
    ],

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
            mediaUploadTag: null,
        };
    },

    computed: {
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
            return `sw-blog-detail--${this.blog.id || 'new'}`;
        }
    },

    created() {
        this.loadCategories();
        this.loadEntity();
    },

    methods: {
        // ------------------- LOAD CATEGORIES -------------------
        loadCategories() {
            const criteria = new Criteria(1, 100);
            criteria.addSorting(Criteria.sort('name', 'ASC'));

            this.categoryRepository.search(criteria, Context.api)
                .then(result => { this.categories = result; });
        },

        // ------------------- LOAD BLOG ENTITY -------------------
        loadEntity() {
            this.isLoading = true;

            if (this.$route.params.id) {
                const criteria = new Criteria(1, 1);
                criteria.addAssociation('mainImage');

                this.blogRepository.get(this.$route.params.id, Context.api, criteria)
                    .then(entity => {
                        this.blog = {
                            ...entity,
                            mainImage: entity.mainImage || null,
                            mainImageId: entity.mainImage?.id || null,
                        };
                    })
                    .finally(() => { this.isLoading = false; });
            } else {
                // New blog
                this.blog = this.blogRepository.create(Context.api);
                this.isLoading = false;
            }
        },

        // ------------------- MEDIA FUNCTIONS -------------------

        setMainImage(media) {
            if (!media) return;

            this.blog.mainImage = media;
            this.blog.mainImageId = media.id;
        },

        removeMainImage() {
            this.blog.mainImage = null;
            this.blog.mainImageId = null;
        },

        onDropMedia(dragData) {
            this.setMainImage(dragData);
        },
        setMediaFromSidebar(media) {
            if (!media) return;
            this.blog.mainImage = media;
            this.blog.mainImageId = media.id;
        },

        openMediaSidebar() {
            if (this.$refs.mediaSidebarItem) {
                this.$refs.mediaSidebarItem.openContent();
            }
        },

        // onDropMedia(dragData) {
        //     if (!dragData) return;
        //     this.blog.mainImageId = dragData.id;
        // },

        onUnlinkLogo() {
            this.blog.mainImage = null;
            this.blog.mainImageId = null;
        },

        // ------------------- SAVE BLOG -------------------
        onSave() {
            if (!this.blog.title || this.blog.title.trim() === '') {
                this.blog.errors.title = 'Title must not be empty';
                this.createNotificationError({ message: 'Please fill the Title field.' });
                return;
            }

            this.isLoading = true;

            this.blogRepository.save(this.blog, Context.api)
                .then(() => {
                    this.createNotificationSuccess({ message: 'Blog saved successfully.' });
                })
                .catch(() => {
                    this.createNotificationError({ message: 'Failed to save blog.' });
                })
                .finally(() => { this.isLoading = false; });
        },
    },
};
