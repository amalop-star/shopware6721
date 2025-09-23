<?php declare(strict_types=1);

namespace SwagBundle\Core\Content\Bundle;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;
use Shopware\Core\Content\Product\ProductDefinition;

class BundleDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'swag_bundle';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return BundleEntity::class;
    }

    public function getCollectionClass(): string
    {
        return BundleCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),

            new StringField('name', 'name'),

            // Many-to-many with products
            new ManyToManyAssociationField(
                'products',
                ProductDefinition::class,
                BundleProductDefinition::class,
                'bundle_id',
                'product_id'
            )
        ]);
    }
}
