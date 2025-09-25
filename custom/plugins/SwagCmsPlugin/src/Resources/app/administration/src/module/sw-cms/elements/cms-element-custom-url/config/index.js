import template from './sw-cms-el-config-custom-url.html.twig';

Shopware.Component.register('sw-cms-el-config-custom-url', {
    template,
    mixins: ['cms-element'],
    watch: {
        'element.config.url.value': {
            handler() {
                this.$emit('element-update', this.element);
            },
            deep: true,
        }
    },
});
