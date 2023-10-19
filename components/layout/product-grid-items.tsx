import clsx from 'clsx';
import Link from 'next/link';

import { Product } from 'lib/shopify/types';

import AddToCartButton from '@/components/add-to-cart-button';
import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import ProductVariantsCard from '@/components/product-variants-card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function ProductGridItems({
  products,
  className
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <>
      {products.map(function (product) {
        const hasJustOneVariant = product.variants.length === 1;

        return (
          <Grid.Item key={product.handle} className={clsx('animate-fadeIn', className)}>
            <Link
              className="relative inline-block h-full w-full"
              href={`/product/${product.handle}`}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.variants[0]!.price.amount,
                  currencyCode: product.variants[0]!.price.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {hasJustOneVariant ? (
                <AddToCartButton
                  productVariant={product.variants[0]!}
                  className="absolute right-0 top-0"
                />
              ) : (
                <HoverCard>
                  <HoverCardTrigger asChild className="absolute right-0 top-0">
                    <Button>Variants</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full">
                    <ProductVariantsCard
                      productHandle={product.handle}
                      variants={product.variants}
                    />
                  </HoverCardContent>
                </HoverCard>
              )}
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
