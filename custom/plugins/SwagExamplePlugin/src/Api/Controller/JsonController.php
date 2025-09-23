<?php declare(strict_types=1);

namespace SwagExamplePlugin\Api\Controller;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route(defaults: ['_routeScope' => ['api']])]
class JsonController extends StorefrontController
{
    /**
     * @OA\Get(
     *     path="/api/_action/swag-example/hello",
     *     summary="Hello World Example",
     *     description="Simple Admin API example endpoint that returns a JSON greeting.",
     *     tags={"Swag Example"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Successful Response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Hello from Admin API JSON Controller!"),
     *             @OA\Property(property="time", type="string", format="date-time", example="2025-09-16 11:45:00")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized - Missing or invalid access token"
     *     )
     * )
     */
    #[Route(
        path: '/api/_action/swag-example/hello',
        name: 'api.action.swag_example.hello',
        methods: ['GET']
    )]
    
    public function hello(Context $context): JsonResponse
    {
        return new JsonResponse([
            'success' => true,
            'message' => 'Hello from Admin API JSON Controller!',
            'time' => date('Y-m-d H:i:s'),
        ]);
    }
}
