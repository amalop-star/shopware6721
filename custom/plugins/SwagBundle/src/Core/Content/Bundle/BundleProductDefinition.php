<?php declare(strict_types=1);

namespace SwagBundle\Core\Content\Bundle;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Content\Product\ProductDefinition;

class BundleProductDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'swag_bundle_product';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return null;
    }

    public function getEntityClass(): string
    {
        return null;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),

            new FkField('bundle_id', 'bundleId', BundleDefinition::class),
            new FkField('product_id', 'productId', ProductDefinition::class),
        ]);
    }
}
