import template from './sw-cms-el-blog-listing-config.html.twig';

Shopware.Component.register('sw-cms-el-config-blog-listing', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        'cms-element'
    ],

    data() {
        return {
            categories: []
        };
    },

    computed: {
        categoryRepository() {
            return this.repositoryFactory.create('swag_blog_category');
        },

        categoryOptions() {
            const options = [
                {
                    value: null,
                    label: 'All Categories'
                }
            ];

            this.categories.forEach(category => {
                options.push({
                    value: category.id,
                    label: category.name
                });
            });

            return options;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('blog-listing');
            this.loadCategories();
        },

        loadCategories() {
            const criteria = new Shopware.Data.Criteria();
            criteria.addSorting(Shopware.Data.Criteria.sort('name', 'ASC'));

            this.categoryRepository.search(criteria, Shopware.Context.api)
                .then((result) => {
                    this.categories = result;
                });
        },

        onCategoryChange(value) {
            this.element.config.category.value = value;
            this.$emit('element-update', this.element);
        },

        onLimitChange(value) {
            this.element.config.limit.value = value;
            this.$emit('element-update', this.element);
        }
    }
});