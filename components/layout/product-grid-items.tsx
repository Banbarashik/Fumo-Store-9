import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Product, ProductVariant } from 'lib/shopify/types';

import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import Price from '@/components/price';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import OpenCart from '@/components/cart/open-cart';

import { addItem } from '@/components/cart/actions';

import ProductVariantsCard from '@/components/product-variants-card';

export default function ProductGridItems({
  products,
  className
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className={clsx('animate-fadeIn', className)}>
          <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
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
            <HoverCard>
              <HoverCardTrigger asChild className="absolute right-0 top-0">
                <Button>Variants</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-full">
                <ProductVariantsCard variants={product.variants} />
              </HoverCardContent>
            </HoverCard>
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
