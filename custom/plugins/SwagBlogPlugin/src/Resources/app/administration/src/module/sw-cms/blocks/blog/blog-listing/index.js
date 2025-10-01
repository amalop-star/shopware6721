import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'blog-listing',
    category: 'text-image',
    label: 'Blog listing',
    component: 'sw-cms-block-blog-listing',
    previewComponent: 'sw-cms-block-blog-listing-preview',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        content: 'blog-listing',  
    },
});

