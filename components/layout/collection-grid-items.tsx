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
              <Link href={collection.path}>
                <Image
                  className="object-contain"
                  alt={collection.image.altText ?? ''}
                  src={collection.image.url}
                  fill
                />
              </Link>
              <Grid>
                <ProductGridItems products={collection.products} />
              </Grid>
            </Grid.Item>
          )
      )}
    </>
  );
}
