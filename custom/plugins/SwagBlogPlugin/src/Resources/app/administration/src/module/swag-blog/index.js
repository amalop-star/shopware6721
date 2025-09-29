const { Module } = Shopware;

Shopware.Component.register('swag-blog-list', () => import('./page/swag-blog-list'));
Shopware.Component.register('swag-blog-detail', () => import('./page/swag-blog-detail'));
Shopware.Component.extend('swag-blog-create', 'swag-blog-detail', () => import('./page/swag-blog-create'));
Shopware.Component.register('swag-blog-media-form', () => import('./component/swag-blog-media-form'));

Module.register('swag-blog', {
    type: 'plugin',   
    name: 'swag-blog',
    title: 'swag-blog.general.mainMenuItemGeneral',
    description: 'swag-blog.general.descriptionTextModule',
    color: '#FFD700',
    icon: 'regular-newspaper',
    entity: 'swag_blog',

    routes: {
        index: {
            component: 'swag-blog-list',
            path: 'index',
            meta: {
                parentPath: 'swag.blog.index',
            },
        },
        detail: {
            component: 'swag-blog-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'swag.blog.index',
            },
        },
        create: {
            component: 'swag-blog-create',
            path: 'create',
            meta: {
                parentPath: 'swag.blog.index',
            },
        },
    },

    navigation: [{
        id: 'swag-blog',
        label: 'swag-blog.general.mainMenuItemGeneral',
        color: '#FFD700',
        path: 'swag.blog.index',
        icon: 'regular-newspaper',
        parent: 'sw-marketing',   
        position: 100,
    }],
});
