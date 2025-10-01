<?php

declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\Cms\DataResolver;

use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Framework\Log\Package;
use SwagBlogPlugin\Core\Content\Blog\BlogDefinition;
use SwagBlogPlugin\Core\Content\BlogCategory\BlogCategoryDefinition;

#[Package('discovery')]
class BlogListingCmsElementResolver extends AbstractCmsElementResolver
{
    private EntityRepository $blogRepository;

    public function __construct(EntityRepository $blogRepository)
    {
        $this->blogRepository = $blogRepository;
    }

  
    public function getType(): string
    {
        return 'blog-listing'; 
    }

    
    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $categoryId = $config->get('category')?->getValue();
        $limit = (int) ($config->get('limit')?->getValue() ?? 5);
        if (!$categoryId) {
            return null;
        }

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('categoryId', $categoryId));
        $criteria->setLimit($limit);

        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add(
            'blog_listing_' . $slot->getUniqueIdentifier(),
            BlogDefinition::class, 
            $criteria
        );
        return $criteriaCollection;
    }

    /**
     * Assign fetched data to the CMS slot for Twig rendering
     */
    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $key = 'blog_listing_' . $slot->getUniqueIdentifier();
        $config = $slot->getFieldConfig();

        $blogs = $result->get($key);
        dd($config);

        if ($blogs) {
            $slot->setData($blogs);
        }


        
    }
}
