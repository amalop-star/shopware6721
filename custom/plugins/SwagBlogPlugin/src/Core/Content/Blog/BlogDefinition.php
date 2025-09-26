<?php

declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\Blog;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Content\Media\MediaDefinition;
use SwagBlogPlugin\Core\Content\BlogCategory\BlogCategoryDefinition;
use SwagBlogPlugin\Core\Content\BlogMedia\BlogMediaDefinition;

class BlogDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'swag_blog';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return BlogEntity::class;
    }

    public function getCollectionClass(): string
    {
        return BlogCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            (new StringField('title', 'title'))->addFlags(new Required()),
            new LongTextField('description', 'description'),
            (new StringField('author', 'author'))->addFlags(new Required()),
            new DateTimeField('published_at', 'publishedAt'),

            new FkField('main_image_id', 'mainImageId', MediaDefinition::class),
            new ManyToOneAssociationField('mainImage', 'main_image_id', MediaDefinition::class, 'id', false),
            new ManyToManyAssociationField(
                'categories',
                BlogCategoryDefinition::class,
                'swag_blog_category_mapping',
                'blog_id',
                'category_id'
            ),
            new OneToManyAssociationField('gallery', BlogMediaDefinition::class, 'blog_id'),
        ]);
    }
}
