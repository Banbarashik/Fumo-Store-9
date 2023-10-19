import Image from 'next/image';
import Link from 'next/link';

import { ProductVariant } from '@/lib/shopify/types';

import AddToCartButton from '@/components/add-to-cart-button';
import Price from '@/components/price';

// TODO: divide the component into multiple components
export default function ProductVariantsCard({
  variants,
  productHandle
}: {
  variants: ProductVariant[];
  productHandle: String;
}) {
  return (
    <ul>
      {variants.map(function (variant: ProductVariant) {
        const params = new URLSearchParams();
        variant.selectedOptions.forEach((option) =>
          params.append(option.name.toLowerCase(), option.value)
        );
        const paramsString = params.toString();

        return (
          <li
            key={variant.id}
            className="rounded-sm border border-transparent hover:border-blue-600"
          >
            <Link
              href={`/product/${productHandle}?${paramsString}`}
              className="flex gap-6 px-3 py-4"
            >
              <Image
                src={variant.image.url}
                alt={variant.image.altText || variant.title}
                width={40}
                height={40}
                className="aspect-square"
              />
              <div>
                <p>{variant.title}</p>
                <Price amount={variant.price.amount} currencyCode={variant.price.currencyCode} />
              </div>
              <AddToCartButton productVariant={variant} className="ml-auto" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
