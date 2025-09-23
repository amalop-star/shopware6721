<?php

namespace SwagExamplePlugin\Core\Content\Example;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

class ExampleCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return ExampleEntity::class;
    }
}
