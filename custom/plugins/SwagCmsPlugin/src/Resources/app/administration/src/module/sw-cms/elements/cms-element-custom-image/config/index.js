import template from './sw-cms-el-config-custom-image.html.twig';

Shopware.Component.register('sw-cms-el-config-custom-image', {
    template,
    mixins: ['cms-element'],
    watch: {
        'element.config.media.value': {
            handler() {
                this.$emit('element-update', this.element);
            },
            deep: true,
        }
    },
});
