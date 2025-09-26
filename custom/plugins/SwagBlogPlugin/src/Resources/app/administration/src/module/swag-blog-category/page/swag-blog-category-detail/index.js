import template from './swag-blog-category-detail.html.twig';

const { Mixin } = Shopware;

export default {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder'),
    ],

    data() {
        return {
            category: {
                name: '',
                description: '',
            },
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    computed: {
        repository() {
            return this.repositoryFactory.create('swag_blog_category');
        },
    },

    created() {
        this.loadEntity();
    },

    methods: {
        loadEntity() {
            this.isLoading = true;

            this.repository
                .get(this.$route.params.id, Shopware.Context.api)
                .then((entity) => {
                    this.category = entity;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        onSave() {
            this.category.errors = {};

            if (!this.category.name || this.category.name.trim() === '') {
                this.category.errors = { name: 'Name must not be empty.' };

                this.createNotificationError({
                    message: this.$tc('swag-blog-category.detail.messageNameRequired') || 'Please fill the Name field.',
                });

                return;
            }
            this.isLoading = true;
            this.isSaveSuccessful = false;

            this.repository
                .save(this.category, Shopware.Context.api)
                .then(() => {
                    this.isSaveSuccessful = true;
                    this.createNotificationSuccess({
                        message: this.$tc('swag-blog-category.detail.messageSaveSuccess'),
                    });
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$tc('swag-blog-category.detail.messageSaveError'),
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

    },
};
