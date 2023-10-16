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
          //* dont't render the collection if it doesn't have an image
          !!collection.image && (
            <Grid.Item
              key={collection.handle}
              className="relative animate-fadeIn overflow-hidden rounded-lg border border-neutral-200 pb-4"
            >
              <Link className="mb-[4%] inline-block w-full" href={collection.path}>
                <Image
                  className="min-h-[55px] w-full object-cover" //* final min-h TBD
                  alt={collection.image.altText ?? ''}
                  src={collection.image.url}
                  width={collection.image.width}
                  height={collection.image.height}
                  sizes="70vw"
                />
              </Link>
              <Grid className="mx-[2%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
