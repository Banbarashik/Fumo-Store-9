import Grid from 'components/grid';
import { Collection } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

import ProductGridItems from './product-grid-items';

export default function CollectionGridItems({ collections }: { collections: Collection[] }) {
  return (
    <>
      {collections.map(
        (collection) =>
          !!collection.image && (
            <Grid.Item
              key={collection.handle}
              className="relative animate-fadeIn border border-neutral-200"
            >
              <Link className="mb-[5%] inline-block w-full" href={collection.path}>
                <Image
                  className="w-full"
                  alt={collection.image.altText ?? ''}
                  src={collection.image.url}
                  width={collection.image.width}
                  height={collection.image.height}
                  sizes="70vw"
                />
              </Link>
              <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <ProductGridItems
                  products={collection.products}
                  className="hidden aspect-square first:block md:last:block sm:[&:nth-child(2)]:block"
                />
              </Grid>
            </Grid.Item>
          )
      )}
    </>
  );
}
