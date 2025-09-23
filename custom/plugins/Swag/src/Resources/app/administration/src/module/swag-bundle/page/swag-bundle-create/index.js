const { Component, Context } = Shopware;

Component.extend('swag-bundle-create', 'swag-bundle-detail', {
    data() {
        return {
            productRepository: null,
            products: []
        };
    },

    created() {
        this.initCreate();
    },

    methods: {
        // Override parent getBundle() so it does NOT fetch an entity
        getBundle() {},

        initCreate() {
            // Create a new bundle entity
            this.bundle = this.repository.create(Context.api);
            this.bundle.products = [];

            // Setup product repository for many-to-many select
            this.productRepository = this.repositoryFactory.create('product');
            this.loadProducts();
        },

        loadProducts() {
            const criteria = new Shopware.Data.Criteria(0, 50);
            this.productRepository.search(criteria, Context.api).then((result) => {
                this.products = result;
            });
        },

        onClickSave() {
            
            this.isLoading = true;

            this.repository.save(this.bundle, Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({
                        name: 'swag.bundle.detail',
                        params: { id: this.bundle.id }
                    });
                })
                .catch((exception) => {
                    this.isLoading = false;
                    this.createNotificationError({
                        title: this.$t('swag-bundle.detail.errorTitle'),
                        message: exception
                    });
                });
        }
    }
});
