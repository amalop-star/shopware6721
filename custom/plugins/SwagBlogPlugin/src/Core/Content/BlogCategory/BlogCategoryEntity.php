<?php

declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\BlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

class BlogCategoryEntity extends Entity
{
    use EntityIdTrait;

    protected ?string $name;

    protected ?string $description;

    protected bool $active;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }
    public function getBlogs(): ?EntityCollection
    {
        return $this->blogs;
    }

    public function setBlogs(EntityCollection $blogs): void
    {
        $this->blogs = $blogs;
    }
    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): void
    {
        $this->active = $active;
    }
}
