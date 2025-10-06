<?php

declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\Cms\DataResolver;

use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Framework\Struct\ArrayEntity;
use Shopware\Core\Framework\Log\Package;
use SwagBlogPlugin\Core\Content\Blog\BlogDefinition;

#[Package('discovery')]
class BlogListingCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'blog-listing';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config     = $slot->getFieldConfig();
        $categoryId = $config->get('category')?->getValue();
        $limit      = (int) ($config->get('limit')?->getValue() ?? 5);

        $criteria = new Criteria();
        $criteria->addAssociation('mainImage');

        if ($categoryId) {
            $criteria->addFilter(new EqualsFilter('categoryId', $categoryId));
            $criteria->addAssociation('category');
        }

        $criteria->setLimit($limit);

        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add(
            'blog_listing_' . $slot->getUniqueIdentifier(),
            BlogDefinition::class,
            $criteria
        );

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $key   = 'blog_listing_' . $slot->getUniqueIdentifier();
        $blogs = $result->get($key);

        if (!$blogs) {
            $slot->setData(new ArrayEntity([
                'blogs'        => [],
                'categoryName' => null,
            ]));
            return;
        }

        // Fetch category name from first blog if available
        $categoryName = null;
        $categoryId = $slot->getFieldConfig()->get('category')?->getValue();

        if ($categoryId) {
            $categoryName = $blogs->first()->getCategory()?->getName();
        }

        $slot->setData(new ArrayEntity([
            'blogs'        => $blogs,
            'categoryName' => $categoryName ?? 'All Blogs',
        ]));
    }
}
