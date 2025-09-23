<?php

declare(strict_types=1);

namespace SwagBundle\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

/**
 * @internal
 */
class Migration1758261241 extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1758261241;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement("
            CREATE TABLE `swag_bundle` (
                `id` BINARY(16) NOT NULL,
                `name` VARCHAR(255) NOT NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $connection->executeStatement("
            CREATE TABLE `swag_bundle_product` (
                `id` BINARY(16) NOT NULL,
                `bundle_id` BINARY(16) NOT NULL,
                `product_id` BINARY(16) NOT NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                PRIMARY KEY (`id`),
                CONSTRAINT `fk.bundle_product.bundle_id` FOREIGN KEY (`bundle_id`) REFERENCES `swag_bundle` (`id`) ON DELETE CASCADE,
                CONSTRAINT `fk.bundle_product.product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    }
}
