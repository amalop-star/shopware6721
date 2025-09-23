import template from './swag-bundle-detail.html.twig';

const { Component, Mixin } = Shopware;

Component.register('swag-bundle-detail', {
    template,

    inject: [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('notification')
    ],

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    // ...existing code...
    data() {
        return {
            bundle: null,
            isLoading: false,
            processSuccess: false,
            repository: null,
            productRepository: null,
            products: [],
            selectedProductIds: []
        };
    },

    computed: {
        options() {
            return [
                { value: 'absolute', name: this.$t('swag-bundle.detail.absoluteText') },
                { value: 'percentage', name: this.$t('swag-bundle.detail.percentageText') }
            ];
        },
        productOptions() {
            return this.products.map(product => ({
                value: product.id,
                label: product.name
            }));
        }
    },

    created() {
        this.repository = this.repositoryFactory.create('swag_bundle');
        this.productRepository = this.repositoryFactory.create('product');
        this.getBundle();
        this.loadProducts();
    },

    methods: {
        getBundle() {
            this.repository
                .get(this.$route.params.id, Shopware.Context.api)
                .then((entity) => {
                    this.bundle = entity;
                    // Set selected products if available
                    if (entity.products) {
                        this.selectedProductIds = entity.products.map(p => p.id);
                    }
                });
        },

        loadProducts() {
            const criteria = new Shopware.Data.Criteria(0, 50);
            this.productRepository.search(criteria, Shopware.Context.api).then((result) => {
                this.products = result;
            });
        },

        onClickSave() {

            this.isLoading = true;
            // Assign selected products to bundle before saving
            this.bundle.products = this.selectedProductIds.map(id => ({ id }));

            this.repository
                .save(this.bundle, Shopware.Context.api)
                .then(() => {
                    this.getBundle();
                    this.isLoading = false;
                    this.processSuccess = true;
                }).catch((exception) => {
                    this.isLoading = false;
                    this.createNotificationError({
                        title: this.$t('swag-bundle.detail.errorTitle'),
                        message: exception
                    });
                });
        },

        saveFinish() {
            this.processSuccess = false;
        }
    }
    // ...existing code...
});
