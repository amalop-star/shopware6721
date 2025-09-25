import template from './sw-cms-el-component-custom-text.html.twig';

Shopware.Component.register('sw-cms-el-component-custom-text', {
    template,
    mixins: ['cms-element'],
    computed: {
        content() {
            return this.element.config.content.value;
        }
    },
    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('custom-text');
        }
    }
});
