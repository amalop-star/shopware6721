

import template from './sw-cms-el-blog-listing-component.html.twig';

const { Mixin } = Shopware;

Shopware.Component.register('sw-cms-el-blog-listing', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            category: null
        };
    },

    computed: {
        categoryRepository() {
            return this.repositoryFactory.create('swag_blog_category');
        },

        selectedCategoryId() {
            return this.element.config.category.value;
        },

        postLimit() {
            return this.element.config.limit.value || 6;
        },

        categoryName() {
            if (this.isLoading) {
                return 'Loading...';
            }
            if (this.selectedCategoryId && !this.category) {
                return 'Loading category...';
            }
            return this.category?.name || 'No category selected';
        }
    },

    watch: {
        selectedCategoryId: {
            handler(newValue) {
                if (newValue) {
                    this.loadCategory(newValue);
                } else {
                    this.category = null;
                }
            },
            immediate: true
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('blog-listing');
        },

        loadCategory(categoryId) {
            this.isLoading = true;
            const criteria = new Shopware.Data.Criteria();

            this.categoryRepository.get(categoryId, Shopware.Context.api, criteria)
                .then((category) => {
                    this.category = category;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.category = null;
                    this.isLoading = false;
                });
        }
    }
});
