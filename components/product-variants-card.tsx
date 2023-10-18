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

export default function ProductVariantsCard({ variants }: { variants: ProductVariant[] }) {
  const router = useRouter();
  const [pendingVariants, setPendingVariants] = useState<String[]>([]);

  return (
    <ul>
      {variants.map(function (variant: ProductVariant) {
        const isVariantPending = pendingVariants.some(
          (addedVariant) => addedVariant === variant.id
        );

        return (
          <li key={variant.id}>
            <Link href={`/product/`}>
              <Image
                src={variant.image.url}
                alt={variant.image.altText || variant.title}
                width={40}
                height={40}
              />
              <div>
                <p>{variant.title}</p>
                <Price amount={variant.price.amount} currencyCode={variant.price.currencyCode} />
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();

                  // Safeguard in case someone messes with `disabled` in devtools.
                  if (!variant.availableForSale || !variant.id) return;

                  setPendingVariants([...pendingVariants, variant.id]);

                  const error = await addItem(variant.id);

                  if (error) {
                    // Trigger the error boundary in the root error.js
                    throw new Error(error.toString());
                  }

                  router.refresh();
                }}
              >
                <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                  {!isVariantPending ? (
                    <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
                  ) : (
                    <LoadingDots className="mb-3 bg-white" />
                  )}
                </div>
              </button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// TODO: make the component remember its state so that the pending variant doesn't reset when component is removed from the DOM
