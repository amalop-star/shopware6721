<?php declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\Blog;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use SwagBlogPlugin\Core\Content\BlogCategory\BlogCategoryEntity;

class BlogEntity extends Entity
{
    use EntityIdTrait;

    protected string $title;
    protected ?string $description = null;
    protected string $author;
    protected ?string $categoryId = null;   // FK field
    protected ?BlogCategoryEntity $category = null; // Association
    protected ?string $mainImageId = null;
    protected ?\DateTimeInterface $publishedAt = null;

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function setAuthor(string $author): void
    {
        $this->author = $author;
    }

    public function getCategoryId(): ?string
    {
        return $this->categoryId;
    }

    public function setCategoryId(?string $categoryId): void
    {
        $this->categoryId = $categoryId;
    }

    public function getCategory(): ?BlogCategoryEntity
    {
        return $this->category;
    }

    public function setCategory(?BlogCategoryEntity $category): void
    {
        $this->category = $category;
    }

    public function getMainImageId(): ?string
    {
        return $this->mainImageId;
    }

    public function setMainImageId(?string $mainImageId): void
    {
        $this->mainImageId = $mainImageId;
    }

    public function getPublishedAt(): ?\DateTimeInterface
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(?\DateTimeInterface $publishedAt): void
    {
        $this->publishedAt = $publishedAt;
    }
}
