<?php

namespace SwagExamplePlugin\Core\Content\Example;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

class ExampleEntityTranslationCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return ExampleEntityTranslationEntity::class;
    }
}
