<?php

declare(strict_types=1);

namespace SwagExamplePlugin\StoreApi\Controller;

use OpenApi\Annotations as OA;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\HttpFoundation\Request;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;

#[Route(defaults: ['_routeScope' => ['store-api']])]
class HelloStoreApiController
{
    private EntityRepository $exampleRepository;

    public function __construct(EntityRepository $exampleRepository)
    {
        $this->exampleRepository = $exampleRepository;
    }
    /**
     * @OA\Get(
     *     path="/store-api/swag-example/hello",
     *     summary="Hello Store API",
     *     description="Custom store API route that returns a greeting",
     *     tags={"SwagExample Store API"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Hello from Store API!"),
     *             @OA\Property(property="time", type="string", format="date-time")
     *         )
     *     )
     * )
     */
    #[Route(
        path: '/store-api/swag-example/hello',
        name: 'store-api.action.swag_example.hello',
        methods: ['GET']
    )]
    public function hello(Context $context): JsonResponse
    {
        $id = Uuid::randomHex();
        $this->exampleRepository->create([
            [
                'id' => $id,
                'name' => 'Test Entity',
                'description' => 'Created via repository',
            ]
        ], Context::createDefaultContext());
        return new JsonResponse([
            'success' => true,
            'message' => 'Entity Created ',
            'time' => date('Y-m-d H:i:s'),
        ]);
    }
    #[Route(
        path: '/store-api/swag-example/create',
        name: 'store-api.action.swag_example.create',
        methods: ['GET']
    )]
    public function create(Request $request, Context $context): JsonResponse
    {
        $id = Uuid::randomHex();

        // Create entity with translations
        // Only use the default language in this example
        $this->exampleRepository->create([[
            'id' => $id,
            'translations' => [
                $context->getLanguageId() => [
                    'name' => 'Red Shoes',
                    'description' => 'English description',
                ],
            ],
        ]], $context);

        // Fetch the created entity
        $criteria = new Criteria([$id]);
        $entity = $this->exampleRepository->search($criteria, $context)->first();

        return new JsonResponse([
            'success' => true,
            'message' => 'Entity created successfully',
            'time' => date('Y-m-d H:i:s'),
            'data' => $entity ? $entity->jsonSerialize() : null,
        ]);
    }
    #[Route(
        path: '/store-api/swag-example/update',
        name: 'store-api.action.swag_example.update',
        methods: ['GET']
    )]
    public function update(Context $context): JsonResponse
    {
        $this->exampleRepository->create([
            [
                'id' => Uuid::randomHex(),
                'name' => 'Test Entity',
                'description' => 'Created via repository',
            ]
        ], Context::createDefaultContext());
        return new JsonResponse([
            'success' => true,
            'message' => 'Hello from Store API!',
            'time' => date('Y-m-d H:i:s'),
        ]);
    }
}
