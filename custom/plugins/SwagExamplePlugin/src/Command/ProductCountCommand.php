<?php

declare(strict_types=1);

namespace SwagExamplePlugin\Command;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

#[AsCommand(
    name: 'swag:product:count',
    description: 'Counts products in Shopware store'
)]
class ProductCountCommand extends Command
{
    private EntityRepository $productRepository;

    public function __construct(EntityRepository $productRepository)
    {
        parent::__construct();
        $this->productRepository = $productRepository;
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Counts products in Shopware store (optionally filter by name)')
            ->addArgument('name', InputArgument::OPTIONAL, 'Filter products by name')
            ->addOption(
                'active',      // option name -> --active
                'a',           // shortcut -> -a
                InputOption::VALUE_NONE, // no value needed (boolean flag)
                'Count only active products'
            );
    }


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $criteria = new \Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria();
        $name = $input->getArgument('name');
        $greeting = "Hello, $name!";

        if ($input->getOption('active')) {
            $greeting = strtoupper($greeting);
        }
        $output->writeln("Counting products with name: $greeting");
        $results = $this->productRepository->search($criteria, Context::createDefaultContext());

        /** @var ProductEntity $product */
        foreach ($results->getEntities() as $product) {
            $output->writeln('Product ID: ' . $product->getUniqueIdentifier());
            $output->writeln('Product Name: ' . $product->getTranslation('name'));
        }
        // $output->writeln("Total products: {$count}");
        return Command::SUCCESS;
    }
}
