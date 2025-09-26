/**
 * @sw-package framework
 */
import template from './swag-blog-category-create.html.twig';
// import './swag-blog-category-create.scss';

const { Mixin } = Shopware;

export default {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification'),
    ],

    data() {
        return {
            category: null,
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
            this.category = this.repository.create(Shopware.Context.api);
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
                .then((entity) => {
                    this.isSaveSuccessful = true;
                    this.createNotificationSuccess({
                        message: this.$tc('swag-blog-category.detail.messageSaveSuccess'),
                    });
                    // navigate to detail page after create
                    this.$router.push({
                        name: 'sw.settings.blog.category.detail',
                        params: { id: this.category.id },
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
