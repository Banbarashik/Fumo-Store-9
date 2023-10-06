import Grid from 'components/grid';
import { Collection } from 'lib/shopify/types';
import Image from 'next/image';

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
              <Image
                className="object-contain"
                alt={collection.image.altText ?? ''}
                src={collection.image.url}
                fill
              />
              <Grid>{/* <ProductGridItems products={collection.products} /> */}</Grid>
            </Grid.Item>
          )
      )}
    </>
  );
}
