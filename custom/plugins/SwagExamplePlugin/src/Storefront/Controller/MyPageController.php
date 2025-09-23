<?php declare(strict_types=1);

namespace SwagExamplePlugin\Storefront\Controller;

use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Shopware\Storefront\Page\GenericPageLoader;

#[Route(defaults: ['_routeScope' => ['storefront']])]
class MyPageController extends StorefrontController
{
    private GenericPageLoader $genericPageLoader;

    public function __construct(GenericPageLoader $genericPageLoader)
    {
        $this->genericPageLoader = $genericPageLoader;
    }

    #[Route(path: '/my-page', name: 'frontend.my.page', methods: ['GET'])]
    public function show(Request $request,SalesChannelContext $context): Response
    {
        $page = $this->genericPageLoader->load($request,$context);
        return $this->renderStorefront('@SwagExamplePlugin/storefront/page/my-page/index.html.twig', [
            'headline' => 'Hello from My Custom Page!',
        ]);
    }
}
