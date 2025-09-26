import template from './swag-blog-category-list.html.twig';

const {
    Mixin,
    Data: { Criteria },
} = Shopware;

export default {
    template,

    compatConfig: Shopware.compatConfig,

    mixins: [
        Mixin.getByName('sw-settings-list'),
    ],

    data() {
        return {
            entityName: 'swag_blog_category',
            sortBy: 'name',
            showModal: false,
            deleteEntity: null,
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        titleSaveSuccess() {
            return this.$tc('global.default.success');
        },

        messageSaveSuccess() {
            if (this.deleteEntity) {
                return this.$tc('swag-blog-category.list.messageDeleteSuccess', 0, {
                    name: this.deleteEntity.name,
                });
            }
            return '';
        },

        listingCriteria() {
            const criteria = new Criteria(this.page, this.limit);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection || 'ASC'));

            const params = this.getMainListingParams();

            if (params.term) {
                criteria.addFilter(Criteria.contains('name', params.term));
            }

            return criteria;
        },
    },

    methods: {
        onDeleteCategory(category) {
            this.deleteEntity = category;
            this.showModal = true;
        },

        confirmDeleteCategory() {
            this.repository
                .delete(this.deleteEntity.id, Shopware.Context.api)
                .then(() => {
                    this.showModal = false;
                    this.deleteEntity = null;
                    this.getList();
                });
        },

        cancelDelete() {
            this.showModal = false;
            this.deleteEntity = null;
        },
    },
};
