'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { ProductVariant } from '@/lib/shopify/types';

import { addItem } from '@/components/cart/actions';
import OpenCart from '@/components/cart/open-cart';
import Price from '@/components/price';

export default function ProductVariantsCard({ variants }: { variants: ProductVariant[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <ul>
      {variants.map((variant: ProductVariant) => (
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
              onClick={(e) => {
                e.preventDefault();

                // Safeguard in case someone messes with `disabled` in devtools.
                if (!variant.availableForSale || !variant.id) return;

                startTransition(async () => {
                  const error = await addItem(variant.id);

                  if (error) {
                    // Trigger the error boundary in the root error.js
                    throw new Error(error.toString());
                  }

                  router.refresh();
                });
              }}
            >
              <OpenCart />
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
