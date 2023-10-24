'use client';

import { useState } from 'react';

import AddToCartButton from '@/components/cart/add-to-cart/button';

export default function AddToCart({
  ...props
}: {
  variantId: string;
  isVariantAvailable: boolean;
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
