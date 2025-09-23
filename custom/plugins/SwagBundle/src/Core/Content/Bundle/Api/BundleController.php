<?php declare(strict_types=1);

namespace SwagBundle\Core\Content\Bundle\Api;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(defaults={"_routeScope"={"api"}})
 */
class BundleController extends AbstractController
{
    public function __construct(
        private readonly EntityRepository $bundleRepository
    ) {
    }

    #[Route(path: '/api/_action/swag-bundle/list', name: 'api.action.swag_bundle.list', methods: ['GET'])]
    public function list(Context $context): JsonResponse
    {
        $criteria = new \Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria();
        $bundles = $this->bundleRepository->search($criteria, $context);

        return new JsonResponse($bundles->getEntities());
    }

    #[Route(path: '/api/_action/swag-bundle/create', name: 'api.action.swag_bundle.create', methods: ['POST'])]
    public function create(Request $request, Context $context): JsonResponse
    {
        $data = $request->toArray();

        $this->bundleRepository->create([
            [
                'id'   => \Shopware\Core\Framework\Uuid\Uuid::randomHex(),
                'name' => $data['name'] ?? 'New Bundle',
            ]
        ], $context);

        return new JsonResponse(['success' => true]);
    }
}
