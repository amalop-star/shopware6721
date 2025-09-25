import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'custom-url',
    label: 'Custom URL',
    component: 'sw-cms-el-component-custom-url',  // must match JS component name
    configComponent: 'sw-cms-el-config-custom-url',
    previewComponent: 'sw-cms-el-preview-custom-url',
    defaultConfig: {
        url: {
            source: 'static',
            value: 'https://example.com',
        },
    },
});
