<?php declare(strict_types=1);

namespace Swag\BundleExample\Core\Checkout\Bundle\Cart;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\CartBehavior;
use Shopware\Core\Checkout\Cart\CartDataCollection;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\Checkout\Cart\Collector\CartCollectorInterface;

class ExampleCartCollector implements CartCollectorInterface
{
    public function collect(
        CartDataCollection $data,
        Cart $original,
        SalesChannelContext $context,
        CartBehavior $behavior
    ): void {
        // Example: collect all product IDs from the cart
        $productIds = [];

        foreach ($original->getLineItems() as $lineItem) {
            if ($lineItem->getType() === 'product') {
                $productIds[] = $lineItem->getReferencedId();
            }
        }

        // Store them in the CartDataCollection so processors can use it
        $data->set('swag_example.product_ids', $productIds);
    }
}
