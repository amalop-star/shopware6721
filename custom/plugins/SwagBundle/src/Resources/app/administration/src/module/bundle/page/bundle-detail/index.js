const { Component } = Shopware;

Component.register('bundle-detail', {
    template: `
        <sw-page>
            <template #smart-bar-header>
                <h2>{{ bundle ? bundle.name : $tc('swag-bundle.detail.title') }}</h2>
            </template>

            <template #content>
                <sw-card title="General">
                    <sw-field type="text" v-model="bundle.name" label="Bundle Name"></sw-field>
                </sw-card>

                <sw-card title="Products">
                    <sw-entity-multi-select
                        v-model="bundle.products"
                        entity="product"
                        label="Products">
                    </sw-entity-multi-select>
                </sw-card>
            </template>

            <template #smart-bar-actions>
                <sw-button variant="primary" @click="onSave">Save</sw-button>
            </template>
        </sw-page>
    `,

    data() {
        return {
            repository: null,
            bundle: null
        };
    },

    created() {
        this.repository = this.repositoryFactory.create('swag_bundle');
        this.loadEntity();
    },

    methods: {
        loadEntity() {
            const id = this.$route.params.id;
            if (!id) {
                this.bundle = this.repository.create(Shopware.Context.api);
                return;
            }

            const criteria = new Shopware.Data.Criteria();
            criteria.addAssociation('products');
            this.repository.get(id, Shopware.Context.api, criteria).then(entity => {
                this.bundle = entity;
            });
        },

        onSave() {
            this.repository.save(this.bundle, Shopware.Context.api).then(() => {
                this.$router.push({ name: 'swag.bundle.index' });
            });
        }
    }
});
