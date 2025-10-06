import template from './swag-blog-create.html.twig';

const { Mixin, Context, Data: { Criteria } } = Shopware;

export default {
    template,

    inject: ['repositoryFactory', 'acl'],

    mixins: [
        Mixin.getByName('notification'),
    ],

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
    },

    created() {
        this.loadCategories();
        this.loadEntity();
    },

    methods: {
        loadEntity() {
            const entity = this.blogRepository.create(Context.api);
            this.blog = {
                ...this.blog,
                ...entity,
                errors: { ...this.blog.errors }
            };
        },




        onSave() {
            if (!this.blog.title || this.blog.title.trim() === '') {
                this.blog.errors.title = 'Title must not be empty';
                this.createNotificationError({
                    message: 'Please fill the Title field.',
                });
                return;
            }

            this.isLoading = true;

            this.blogRepository.save(this.blog, Context.api)
                .then(() => {
                    this.createNotificationSuccess({ message: 'Blog created successfully.' });
                    // navigate to detail page
                    this.$router.push({ name: 'swag.blog.detail', params: { id: this.blog.id } });
                })
                .catch(() => {
                    this.createNotificationError({ message: 'Failed to create blog.' });
                })
                .finally(() => { this.isLoading = false; });
        },
    },
};
