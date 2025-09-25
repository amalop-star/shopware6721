import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'custom-image',
    label: 'Custom Image',
    component: 'sw-cms-el-component-custom-image',
    configComponent: 'sw-cms-el-config-custom-image',
    previewComponent: 'sw-cms-el-preview-custom-image',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            required: true,
        },
    },
});
