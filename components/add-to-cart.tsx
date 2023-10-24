'use client';

import { SetStateAction, useState } from 'react';

import AddToCartButton from '@/components/add-to-cart-button';

export default function AddToCart({
  ...props
}: {
  isVariantAvailable: boolean;
  className?: string;
  addVariantToPending: SetStateAction<boolean>;
  removeVariantFromPending: SetStateAction<boolean>;
  variantId: string;
}) {
  const [isPending, setIsPending] = useState(false);

  return (
    <AddToCartButton
      {...props}
      isPending={isPending}
      addVariantToPending={() => setIsPending(true)}
      removeVariantFromPending={() => setIsPending(false)}
    />
  );
}
