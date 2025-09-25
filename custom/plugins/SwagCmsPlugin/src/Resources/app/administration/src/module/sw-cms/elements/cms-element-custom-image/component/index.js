import template from './sw-cms-el-component-custom-image.html.twig';

Shopware.Component.register('sw-cms-el-component-custom-image', {
    template,
    mixins: ['cms-element'],
    computed: {
        mediaUrl() {
            return this.element.config.media.value;
        },
    },
    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('custom-image');
        }
    }
});
