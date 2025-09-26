<?php

declare(strict_types=1);

namespace SwagBlogPlugin\Core\Content\BlogMedia;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use SwagBlogPlugin\Core\Content\Blog\BlogEntity;
use Shopware\Core\Content\Media\MediaEntity;

class BlogMediaEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string|null
     */
    protected ?string $blogId = null;

    /**
     * @var string|null
     */
    protected ?string $mediaId = null;

    /**
     * @var string|null
     */
    protected ?string $title = null;

    /**
     * @var string|null
     */
    protected ?string $description = null;

    /**
     * @var BlogEntity|null
     */
    protected ?BlogEntity $blog = null;

    /**
     * @var MediaEntity|null
     */
    protected ?MediaEntity $media = null;

    // --- Getters & Setters ---

    public function getBlogId(): ?string
    {
        return $this->blogId;
    }

    public function setBlogId(?string $blogId): void
    {
        $this->blogId = $blogId;
    }

    public function getMediaId(): ?string
    {
        return $this->mediaId;
    }

    public function setMediaId(?string $mediaId): void
    {
        $this->mediaId = $mediaId;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
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

    public function getBlog(): ?BlogEntity
    {
        return $this->blog;
    }

    public function setBlog(?BlogEntity $blog): void
    {
        $this->blog = $blog;
    }

    public function getMedia(): ?MediaEntity
    {
        return $this->media;
    }

    public function setMedia(?MediaEntity $media): void
    {
        $this->media = $media;
    }
}
