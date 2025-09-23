<?php

namespace SwagExamplePlugin\Core\Content\Example;

use Shopware\Core\Framework\DataAbstractionLayer\EntityTranslationDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class ExampleEntityTranslationDefinition extends EntityTranslationDefinition
{
    public const ENTITY_NAME = 'swag_example_translation';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return ExampleEntityTranslationCollection::class;
    }

    public function getEntityClass(): string
    {
        return ExampleEntityTranslationEntity::class;
    }
    public function getParentDefinitionClass(): string
    {
        return ExampleDefinition::class;
    }
    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            new FkField('swag_example_id', 'exampleId', ExampleDefinition::class),
            new StringField('name', 'name'),
            new CreatedAtField(),
        ]);
    }
}
