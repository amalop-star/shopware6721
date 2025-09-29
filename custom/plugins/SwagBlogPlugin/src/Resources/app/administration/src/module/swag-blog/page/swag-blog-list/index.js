import template from './swag-blog-list.html.twig';

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
            entityName: 'swag_blog',
            sortBy: 'title',   // default sorting by title
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
                return this.$tc('swag-blog.list.messageDeleteSuccess', 0, {
                    title: this.deleteEntity.title,
                });
            }
            return '';
        },

        listingCriteria() {
            const criteria = new Criteria(this.page, this.limit);

            // default sorting
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection || 'ASC'));

            const params = this.getMainListingParams();

            if (params.term) {
                criteria.addFilter(Criteria.contains('title', params.term));
            }

            criteria.addAssociation('category');
            criteria.addAssociation('mainImage');
            criteria.addAssociation('gallery');

            return criteria;
        },
        formatPublishedAt(date) {
            if (!date) return '';
            return new Date(date).toLocaleString();
        },
        repository() {
            return this.repositoryFactory.create('swag_blog');
        },
    },

    methods: {
        onDeleteBlog(blog) {
            this.deleteEntity = blog;
            this.showModal = true;
        },

        confirmDeleteBlog() {
            if (!this.deleteEntity?.id) return;

            this.repository
                .delete(this.deleteEntity.id, Shopware.Context.api)
                .then(() => {
                    this.showModal = false;
                    this.deleteEntity = null;
                    this.getList();
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$tc('swag-blog.list.messageDeleteError'),
                    });
                });
        },


        cancelDelete() {
            this.showModal = false;
            this.deleteEntity = null;
        },
    },
};
