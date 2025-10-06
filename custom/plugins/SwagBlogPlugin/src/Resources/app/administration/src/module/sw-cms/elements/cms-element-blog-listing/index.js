import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'blog-listing',
    label: 'Blog Listing',
    component: 'sw-cms-el-blog-listing',        
    configComponent: 'sw-cms-el-config-blog-listing',  
    previewComponent: 'sw-cms-el-preview-blog-listing', 
    defaultConfig: {
        category: {
            source: 'static',
            value: null,
            required: false,
            entity: {
                name: 'swag_blog_category'
            }
        },
        limit: {
            source: 'static',
            value: 6
        }
    }
});