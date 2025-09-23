import template from './index.html.twig';

const { Component, Mixin, Data } = Shopware;

Component.register('bundle-list', {
    template,

    mixins: [ Shopware.Mixin.getByName('listing') ], // Use 'listing' mixin instead

    data() {
        return {
            repository: null,
            bundles: [],
            total: 0,
            columns: [
                { property: 'name', label: 'Name' },
            ],
            criteria: new Data.Criteria()
        };
    },

    created() {
        // Directly create repository using Shopware global repositoryFactory
        this.repository = Shopware.Service('repositoryFactory').create('swag_bundle');
        this.loadBundles();
    },

    methods: {
        loadBundles() {
            this.repository.search(this.criteria, Shopware.Context.api).then(result => {
                this.bundles = result;
                this.total = result.total;
            });
        }
    }
});
