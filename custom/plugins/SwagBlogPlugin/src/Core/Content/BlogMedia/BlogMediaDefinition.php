<?php declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\BlogMedia;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Content\Media\MediaDefinition;
use SwagBlogPlugin\Core\Content\Blog\BlogDefinition;

class BlogMediaDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'swag_blog_media';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return BlogMediaEntity::class;
    }

    public function getCollectionClass(): string
    {
        return BlogMediaCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('blog_id', 'blogId', BlogDefinition::class))->addFlags(new Required()),
            (new FkField('media_id', 'mediaId', MediaDefinition::class))->addFlags(new Required()),
            new IntField('position', 'position'),

            new ManyToOneAssociationField('blog', 'blog_id', BlogDefinition::class),
            new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class),
        ]);
    }
}
