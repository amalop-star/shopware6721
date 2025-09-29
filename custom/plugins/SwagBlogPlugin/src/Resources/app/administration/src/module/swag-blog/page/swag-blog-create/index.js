/**
 * @sw-package framework
 */
import template from './swag-blog-create.html.twig';
// import './swag-blog-create.scss';

const { Mixin } = Shopware;

export default {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification'),
    ],

    data() {
        return {
            blog: null,
            isLoading: false,
            isSaveSuccessful: false,
        };
    },

    computed: {
        repository() {
            return this.repositoryFactory.create('swag_blog');
        },
    },

    created() {
        this.loadEntity();
    },

    methods: {
        loadEntity() {
            this.blog = this.repository.create(Shopware.Context.api);
        },

        onSave() {
            this.blog.errors = {};

            if (!this.blog.title || this.blog.title.trim() === '') {
                this.blog.errors = { title: 'Title must not be empty.' };

                this.createNotificationError({
                    message: this.$tc('swag-blog.detail.messageTitleRequired') || 'Please fill the Title field.',
                });

                return;
            }

            this.isLoading = true;
            this.isSaveSuccessful = false;

            this.repository
                .save(this.blog, Shopware.Context.api)
                .then((entity) => {
                    this.isSaveSuccessful = true;
                    this.createNotificationSuccess({
                        message: this.$tc('swag-blog.detail.messageSaveSuccess'),
                    });
                    // navigate to detail page after create
                    this.$router.push({
                        name: 'swag.blog.detail',
                        params: { id: this.blog.id },
                    });
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$tc('swag-blog.detail.messageSaveError'),
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
};
