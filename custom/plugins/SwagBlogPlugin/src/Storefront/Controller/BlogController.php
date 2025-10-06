<?php

declare(strict_types=1);

namespace SwagBlogPlugin\Storefront\Controller;

use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;

#[Route(defaults: ['_routeScope' => ['storefront']])]
class BlogController extends StorefrontController
{
    private EntityRepository $blogRepository;

    public function __construct(EntityRepository $blogRepository)
    {
        $this->blogRepository = $blogRepository;
    }

    #[Route(
        path: '/blog/detail/{blogId}',
        name: 'frontend.blog.detail',
        methods: ['GET']
    )]
    public function view(string $blogId, Request $request, SalesChannelContext $context): Response
    {
        $criteria = new Criteria([$blogId]);
        $criteria->addAssociation('mainImage');
        $criteria->addAssociation('category');
        $blog = $this->blogRepository->search($criteria, $context->getContext())->first();

        if (!$blog) {
            throw $this->createNotFoundException('Blog not found');
        }
        return $this->renderStorefront('@SwagBlogPlugin/storefront/page/blog-detail.html.twig', [
            'blog' => $blog,
        ]);
    }
}
