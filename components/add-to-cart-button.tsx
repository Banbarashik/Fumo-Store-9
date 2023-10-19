'use client';

import { addItem } from '@/components/cart/actions';
import LoadingDots from '@/components/loading-dots';
import { ProductVariant } from '@/lib/shopify/types';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddToCartButton({ productVariant }: { productVariant: ProductVariant }) {
  const router = useRouter();
  const [pendingVariants, setPendingVariants] = useState<String[]>([]);

  const isPending = pendingVariants.some((variant) => variant === productVariant.id);

  return (
    <button
      className="ml-auto"
      onClick={async (e) => {
        e.preventDefault();

        // Safeguard in case someone messes with `disabled` in devtools.
        if (!productVariant.availableForSale || !productVariant.id) return;

        setPendingVariants([...pendingVariants, productVariant.id]);

        const error = await addItem(productVariant.id);

        if (error) {
          // Trigger the error boundary in the root error.js
          throw new Error(error.toString());
        }

        router.refresh();
      }}
    >
      <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
        {!isPending ? (
          <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
        ) : (
          <LoadingDots className="mb-3 bg-white" />
        )}
      </div>
    </button>
  );
}