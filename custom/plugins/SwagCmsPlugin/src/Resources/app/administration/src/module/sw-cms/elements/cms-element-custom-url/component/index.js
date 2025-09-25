import template from './sw-cms-el-component-custom-url.html.twig';

Shopware.Component.register('sw-cms-el-component-custom-url', {
    template,
    mixins: ['cms-element'],
    computed: {
        url() {
            return this.element.config.url.value;
        },
    },
     created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('custom-url');
        }
    }
});
