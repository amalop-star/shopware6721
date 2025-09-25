import template from './sw-cms-el-config-custom-text.html.twig';

Shopware.Component.register('sw-cms-el-config-custom-text', {
    template,
    mixins: ['cms-element'],
    watch: {
        'element.config.content.value': {
            handler() {
                this.$emit('element-update', this.element);
            },
            deep: true,
        }
    },
});
