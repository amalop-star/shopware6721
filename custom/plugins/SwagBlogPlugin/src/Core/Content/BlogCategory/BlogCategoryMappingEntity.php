<?php declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\BlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use SwagBlogPlugin\Core\Content\Blog\BlogEntity;

class BlogCategoryMappingEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $blogId;

    /**
     * @var string
     */
    protected $categoryId;

    /**
     * @var BlogEntity|null
     */
    protected $blog;

    /**
     * @var BlogCategoryEntity|null
     */
    protected $category;

    // --- Getters & Setters ---

    public function getBlogId(): string
    {
        return $this->blogId;
    }

    public function setBlogId(string $blogId): void
    {
        $this->blogId = $blogId;
    }

    public function getCategoryId(): string
    {
        return $this->categoryId;
    }

    public function setCategoryId(string $categoryId): void
    {
        $this->categoryId = $categoryId;
    }

    public function getBlog(): ?BlogEntity
    {
        return $this->blog;
    }

    public function setBlog(?BlogEntity $blog): void
    {
        $this->blog = $blog;
    }

    public function getCategory(): ?BlogCategoryEntity
    {
        return $this->category;
    }

    public function setCategory(?BlogCategoryEntity $category): void
    {
        $this->category = $category;
    }
}
