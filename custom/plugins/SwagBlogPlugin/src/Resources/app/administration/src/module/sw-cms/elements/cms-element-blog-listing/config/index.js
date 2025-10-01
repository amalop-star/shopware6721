import template from './sw-cms-el-blog-listing-config.html.twig';


const { Mixin } = Shopware;

Shopware.Component.register('sw-cms-el-config-blog-listing', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            category: null,
            isLoading: false
        };
    },

    computed: {
        categoryRepository() {
            return this.repositoryFactory.create('swag_blog_category');
        },

        selectedCategoryId() {
            return this.element?.config?.category?.value || null;
        },

        postLimit() {
            return this.element?.config?.limit?.value || 6;
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
            handler(newValue, oldValue) {
                // Only load if value actually changed and component is ready
                if (newValue && newValue !== oldValue) {
                    this.loadCategory(newValue);
                } else if (!newValue) {
                    this.category = null;
                }
            }
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('blog-listing');
            
            // Load category after config is initialized
            if (this.selectedCategoryId) {
                this.loadCategory(this.selectedCategoryId);
            }
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
