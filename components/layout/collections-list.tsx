import Image from 'next/image';
import Link from 'next/link';

import { GridTileImage } from '@/components/grid/tile';

import { Product } from '@/lib/shopify/types';
import { getCollections } from 'lib/shopify';

export default async function CollectionsList() {
  const collections = await getCollections();

  return (
    <ul className="mb-10 flex animate-fadeIn flex-col gap-14">
      {collections.map(
        (collection) =>
          //* dont't render the collection if it doesn't have an image
          !!collection.image && (
            <li
              key={collection.handle}
              className="w-full overflow-hidden rounded-lg border border-t-0 border-neutral-200 pb-4"
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
              <CollectionBestSellersList products={collection.products} />
            </li>
          )
      )}
    </ul>
  );
}

function CollectionBestSellersList({ products }: { products: Product[] }) {
  return (
    <ul className="mx-[2%] flex gap-4">
      {products.map((product) => (
        <li
          key={product.handle}
          className="hidden aspect-square w-full animate-fadeIn first:block md:last:block sm:[&:nth-child(2)]:block"
        >
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
