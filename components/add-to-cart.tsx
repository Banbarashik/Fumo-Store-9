'use client';

import { SetStateAction, useState } from 'react';

import AddToCartButton from '@/components/add-to-cart-button';

export default function AddToCart({
  ...props
}: {
  variantId: string;
  isVariantAvailable: boolean;
  addVariantToPending: SetStateAction<boolean>;
  removeVariantFromPending: SetStateAction<boolean>;
  className?: string;
}) {
  const [isPending, setIsPending] = useState(false);

  return (
    <AddToCartButton
      {...props}
      isPending={isPending}
      setAsPending={() => setIsPending(true)}
      setAsAdded={() => setIsPending(false)}
    />
  );
}
