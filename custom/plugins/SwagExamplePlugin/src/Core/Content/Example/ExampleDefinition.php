<?php

namespace SwagExamplePlugin\Core\Content\Example;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslationsAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
class ExampleDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'swag_example';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return ExampleCollection::class;
    }

    public function getEntityClass(): string
    {
        return ExampleEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
        (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            new TranslationsAssociationField(ExampleEntityTranslationDefinition::class, 'swag_example_id'),
            new CreatedAtField(),
        ]);
    }
}
