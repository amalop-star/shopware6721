<?php

declare(strict_types=1);

namespace SwagBlogPlugin\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1758793285CreateBlogTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1758793285;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
        CREATE TABLE IF NOT EXISTS `swag_blog` (
            `id` BINARY(16) NOT NULL,
            `title` VARCHAR(255) NOT NULL,
            `description` LONGTEXT NULL,
            `author` VARCHAR(255) NOT NULL,
            `main_image_id` BINARY(16) NULL,
            `category_id` BINARY(16) NULL, 
            `published_at` DATETIME NULL,
            `created_at` DATETIME NOT NULL,
            `updated_at` DATETIME NULL,
            PRIMARY KEY (`id`),
            CONSTRAINT `fk_blog_category`
        FOREIGN KEY (`category_id`)
        REFERENCES `swag_blog_category` (`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
        )
            ENGINE = InnoDB
            DEFAULT CHARSET = utf8mb4
            COLLATE = utf8mb4_unicode_ci;
        SQL;
        $connection->executeStatement($sql);

        $gallery_sql = <<<SQL
        CREATE TABLE IF NOT EXISTS `swag_blog_media` (
                `id` BINARY(16) NOT NULL,
                `blog_id` BINARY(16) NOT NULL,
                `media_id` BINARY(16) NOT NULL,
                `position` INT(11) DEFAULT 1,
                `created_at` DATETIME NOT NULL,
                `updated_at` DATETIME NULL,
                PRIMARY KEY (`id`),
                CONSTRAINT `fk.swag_blog_media.blog` FOREIGN KEY (`blog_id`)
                    REFERENCES `swag_blog` (`id`) ON DELETE CASCADE,
                CONSTRAINT `fk.swag_blog_media.media` FOREIGN KEY (`media_id`)
                    REFERENCES `media` (`id`) ON DELETE CASCADE
            ) ENGINE = InnoDB
            DEFAULT CHARSET = utf8mb4
            COLLATE = utf8mb4_unicode_ci;
        SQL;
        $connection->executeStatement($gallery_sql);
    }

    public function updateDestructive(Connection $connection): void {}
}
