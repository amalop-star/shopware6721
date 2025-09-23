<?php

namespace SwagExamplePlugin\Core\Content\Example;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class ExampleEntity extends Entity
{
    use EntityIdTrait;

    protected ?string $name;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }
}
