import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'custom-text',
    label: 'Custom Text',
    component: 'sw-cms-el-component-custom-text',
    configComponent: 'sw-cms-el-config-custom-text',
    previewComponent: 'sw-cms-el-preview-custom-text',
    defaultConfig: {
        content: {
            source: 'static',
            value: null,
            required: true,
        },
    },
});
