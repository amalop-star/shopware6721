const { Module } = Shopware;

Module.register('swag-bundle', {
    type: 'plugin',
    name: 'Bundle',
    title: 'Bundle',
    description: 'Manage bundles',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag',

    routes: {
        index: {
            component: 'bundle-list',
            path: 'index'
        },
        create: {
            component: 'bundle-create',
            path: 'create'
        }
    },

    navigation: [
        {
            id: 'swag-bundle',
            label: 'Bundles',
            color: '#ff3d58',
            path: 'swag.bundle.index',   // 👈 this must match "index" route
            parent: 'sw-catalogue',
            position: 100
        }
    ]
});
