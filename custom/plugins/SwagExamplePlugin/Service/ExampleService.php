<?php declare(strict_types=1);

namespace SwagExamplePlugin\Service;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\Uuid\Uuid;

class ExampleService
{
    private EntityRepository $exampleRepository;

    public function __construct(EntityRepository $exampleRepository)
    {
        $this->exampleRepository = $exampleRepository;
    }

    public function createExample(Context $context, string $name, ?string $description = null): void
    {
        $this->exampleRepository->create([
            [
                'id' => Uuid::randomHex(),
                'name' => $name,
                'description' => $description,
            ]
        ], $context);
    }
}
