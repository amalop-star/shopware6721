import template from './swag-blog-detail.html.twig';

const { Mixin, Data: { Criteria } } = Shopware;

export default {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder'),
    ],

    data() {
        return {
            blog: {
                title: '',
                description: '',
                author: '',
                categoryId: null,
                mainImageId: null,
                gallery: null, // will initialize as EntityCollection
                errors: {},
                publishedAt: null,
            },
            categories: [],
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    computed: {
        blogRepository() {
            return this.repositoryFactory.create('swag_blog');
        },
        blogMediaRepository() {
            return this.repositoryFactory.create('swag_blog_media');
        },
        categoryRepository() {
            return this.repositoryFactory.create('swag_blog_category');
        },
        categoryOptions() {
            return this.categories.map(cat => ({
                value: cat.id,
                label: cat.name,
            }));
        },
    },

    created() {
        this.loadCategories();
        this.loadEntity();
    },

    methods: {
        loadCategories() {
            const criteria = new Criteria(1, 100);
            criteria.addSorting(Criteria.sort('name', 'ASC'));

            this.categoryRepository.search(criteria, Shopware.Context.api)
                .then(result => {
                    this.categories = result;
                });
        },

        loadEntity() {
            this.isLoading = true;

            this.blogRepository.get(this.$route.params.id, Shopware.Context.api, {
                associations: ['mainImage', 'gallery', 'gallery.media']
            }).then(entity => {
                // Ensure gallery is always an EntityCollection, even if empty
                if (!entity.gallery || entity.gallery.length === 0) {
                    entity.gallery = this.blogMediaRepository.createCollection();
                } else if (!Shopware.Data.EntityCollection.isEntityCollection(entity.gallery)) {
                    entity.gallery = this.blogMediaRepository.createCollection(entity.gallery);
                }

                // Ensure mainImage exists (can be null)
                if (!entity.mainImage) {
                    entity.mainImage = null;
                }

                // Assign entity to blog data
                this.blog = entity;

                // Pre-fill fields (optional)
                this.blog.title = entity.title;
                this.blog.description = entity.description;
                this.blog.author = entity.author;
                this.blog.categoryId = entity.categoryId;
                this.blog.mainImageId = entity.mainImageId;
                this.blog.publishedAt = entity.publishedAt;

            }).finally(() => {
                this.isLoading = false;
            });
        },



        onSave() {
            this.blog.errors = {};

            if (!this.blog.title || this.blog.title.trim() === '') {
                this.blog.errors = { title: 'Title must not be empty.' };

                this.createNotificationError({
                    message: this.$tc('swag-blog.detail.messageTitleRequired') || 'Please fill the Title field.',
                });
                return;
            }

            this.isLoading = true;
            this.isSaveSuccessful = false;

            this.blogRepository.save(this.blog, Shopware.Context.api)
                .then(() => {
                    this.isSaveSuccessful = true;
                    this.createNotificationSuccess({
                        message: this.$tc('swag-blog.detail.messageSaveSuccess'),
                    });
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$tc('swag-blog.detail.messageSaveError'),
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
};
