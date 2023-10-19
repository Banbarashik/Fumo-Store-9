'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ProductVariant } from '@/lib/shopify/types';

import { addItem } from '@/components/cart/actions';
import LoadingDots from '@/components/loading-dots';
import Price from '@/components/price';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import AddToCartButton from '@/components/add-to-cart-button';

// TODO: make the component remember its state so that the pending variant doesn't reset when component is removed from the DOM
// TODO: divide the component into multiple components
export default function ProductVariantsCard({
  variants,
  productHandle
}: {
  variants: ProductVariant[];
  productHandle: String;
}) {
  const [pendingVariants, setPendingVariants] = useState<String[]>([]);

  return (
    <ul>
      {variants.map(function (variant: ProductVariant) {
        const params = new URLSearchParams();
        variant.selectedOptions.forEach((option) =>
          params.append(option.name.toLowerCase(), option.value)
        );
        const paramsString = params.toString();

        return (
          // TODO: think if it's better to use the common hover effect (blue outline for dark theme)
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
              <AddToCartButton productVariant={variant} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
