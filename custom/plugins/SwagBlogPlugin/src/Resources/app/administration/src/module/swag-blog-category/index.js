

const { Module, Feature } = Shopware;
Shopware.Component.register('swag-blog-category-list', () => import('./page/swag-blog-category-list'));
Shopware.Component.register('swag-blog-category-detail',() => import('./page/swag-blog-category-detail'),);
Shopware.Component.extend('swag-blog-category-create','swag-blog-category-detail',() => import('./page/swag-blog-category-create'));
Module.register('sw-settings-blog-category', {
    type: 'core',
    name: 'sw-settings-blog-category',
    title: 'Blog Categories',
    description: 'Manage Blog Categories',
    color: '#9AA8B5',
    icon: 'regular-cog',
    favicon: 'icon-module-settings.png',
    entity: 'swag_blog_category',

    routes: {
        index: {
            component: 'swag-blog-category-list',
            path: 'index',
            meta: {
                parentPath: 'sw.settings.index.system',
            },
        },
        detail: {
            component: 'swag-blog-category-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'sw.settings.blog.category.index',
            },
        },
        create: {
            component: 'swag-blog-category-create',
            path: 'create',
            meta: {
                parentPath: 'sw.settings.blog.category.index',
            },
        },
    },

    settingsItem: {
        group: function () {
            // @deprecated tag:v6.7.0 - Remove condition and function callback
            if (!Feature.isActive('v6.7.0.0')) {
                return 'system';
            }

            return 'content';
        },
        to: 'sw.settings.blog.category.index',
        icon: 'regular-bars-square',
    },
});
