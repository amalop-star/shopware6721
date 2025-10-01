import template from './sw-cms-block-blog-listing-preview.html.twig';
import './sw-cms-block-blog-listing-preview.scss';

Shopware.Component.register('sw-cms-block-blog-listing-preview', {
    template,
    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});