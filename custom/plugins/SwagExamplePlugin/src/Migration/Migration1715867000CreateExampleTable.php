<?php

namespace SwagExamplePlugin\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1715867000CreateExampleTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1715867000;
    }

    public function update(Connection $connection): void
    {
        // Main table
        $connection->executeStatement('
    CREATE TABLE IF NOT EXISTS `swag_example` (
        `id` BINARY(16) NOT NULL,
        `created_at` DATETIME(3) NOT NULL,
        `updated_at` DATETIME(3) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
');

        // Translation table
        $connection->executeStatement('
    CREATE TABLE IF NOT EXISTS `swag_example_translation` (
        `id` BINARY(16) NOT NULL,
        `swag_example_id` BINARY(16) NOT NULL,
        `language_id` BINARY(16) NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `description` VARCHAR(255) NULL,
        `created_at` DATETIME(3) NOT NULL,
        `updated_at` DATETIME(3) NULL,
        PRIMARY KEY (`id`, `language_id`),
        CONSTRAINT `fk.example_translation.example` FOREIGN KEY (`swag_example_id`)
            REFERENCES `swag_example` (`id`) ON DELETE CASCADE,
        CONSTRAINT `fk.example_translation.language` FOREIGN KEY (`language_id`)
            REFERENCES `language` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
');
    }

    public function updateDestructive(Connection $connection): void
    {
        $connection->executeStatement('DROP TABLE IF EXISTS `swag_example_translation`;');
        $connection->executeStatement('DROP TABLE IF EXISTS `swag_example`;');
    }
}
