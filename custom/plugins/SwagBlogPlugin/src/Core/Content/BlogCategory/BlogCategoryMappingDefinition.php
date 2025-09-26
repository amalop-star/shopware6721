<?php declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\BlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use SwagBlogPlugin\Core\Content\Blog\BlogDefinition;

class BlogCategoryMappingDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'swag_blog_category_mapping';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return BlogCategoryMappingEntity::class;
    }

    public function getCollectionClass(): string
    {
        return BlogCategoryMappingCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new FkField('blog_id', 'blogId', BlogDefinition::class))
                ->addFlags(new PrimaryKey(), new Required()),

            (new FkField('category_id', 'categoryId', BlogCategoryDefinition::class))
                ->addFlags(new PrimaryKey(), new Required()),

            new ManyToOneAssociationField('blog', 'blog_id', BlogDefinition::class, 'id', false),
            new ManyToOneAssociationField('category', 'category_id', BlogCategoryDefinition::class, 'id', false),
        ]);
    }
}
