import template from './swag-bundle-detail.html.twig';

const { Component, Mixin } = Shopware;
const Criteria = Shopware.Data.Criteria;

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
            const criteria = new Criteria();
            criteria.addAssociation('products');
            this.repository
                .get(this.$route.params.id, Shopware.Context.api, criteria)
                .then((entity) => {
                    this.bundle = entity;
                    // Set selectedProductIds for multi-select
                    if (entity.products) {
                        this.selectedProductIds = entity.products.map(p => p.id);
                    } else {
                        this.selectedProductIds = [];
                    }
                });
        },

        loadProducts() {
            const criteria = new Criteria(1, 100);
            criteria.addFilter(
                Criteria.equals('active', true)
            );
            criteria.addAssociation('translations'); // If using translations
            criteria.addSorting(
                Criteria.sort('name', 'ASC')
            );

            this.productRepository
                .search(criteria, Shopware.Context.api)
                .then((result) => {
                    this.products = result;
                });
        },

        onClickSave() {
            this.isLoading = true;

            
            this.bundle.products = this.selectedProductIds.map(id => ({ id }));

            this.repository
                .save(this.bundle, Shopware.Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({ name: 'swag.bundle.detail', params: { id: this.bundle.id } });
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
});