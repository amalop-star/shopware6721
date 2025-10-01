import template from './swag-blog-media-form.html.twig';
// import './swag-blog-media-form.scss';
const { Component, Mixin } = Shopware;

export default {
    template,

    inject: ['repositoryFactory', 'systemConfigApiService'],

    emits: ['media-open'],

    mixins: [Mixin.getByName('notification')],

    props: {
        blog: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fileAccept: {
            type: String,
            default: '*/*',
        },
    },

    data() {
        return {
            isMediaLoading: false,
            columnCount: 5,
            columnWidth: 90,
        };
    },

    computed: {
        mediaItems() {
            return this.blog.gallery || [];
        },

        isLoading() {
            return this.isMediaLoading;
        },

        gridAutoRows() {
            return `grid-auto-rows: ${this.columnWidth}px`;
        },
    },

    methods: {
        onOpenMedia() {
            this.$emit('media-open');
        },

        removeFile(mediaItem) {
            if (this.disabled) return;
            this.$emit('remove-media', mediaItem);
        },

        markMediaAsCover(mediaItem) {
            if (this.disabled) return;
            this.$emit('set-main-image', mediaItem);
        },

        isCover(mediaItem) {
            return mediaItem.id === this.blog.mainImageId;
        },
    },
};
