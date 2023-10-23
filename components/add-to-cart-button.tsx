'use client';

import { addItem } from '@/components/cart/actions';
import LoadingDots from '@/components/loading-dots';
import { Button } from '@/components/ui/button';
import { ProductVariant } from '@/lib/shopify/types';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// TODO: make the component remember its state so that the pending variant doesn't reset when component is removed from the DOM
export default function AddToCartButton({
  productVariant,
  className,
  // isPending,
  // setIsPending
  pendingVariants,
  setPendingVariants
}: {
  productVariant: ProductVariant;
  className?: string;
  // isPending?: boolean;
  // setIsPending?: any;
  pendingVariants?: string[];
  setPendingVariants?: any;
}) {
  const router = useRouter();
  // const [pendingVariants, setPendingVariants] = useState<String[]>([]);

  if (!pendingVariants) return <></>;

  const isPending = pendingVariants.some((variant) => variant === productVariant.id);

  return (
    <Button
      aria-label="Add to cart"
      className={className}
      onClick={async (e) => {
        e.preventDefault();

        // Safeguard in case someone messes with `disabled` in devtools.
        if (!productVariant.availableForSale || !productVariant.id) return;

        setPendingVariants([...pendingVariants, productVariant.id]);
        // setIsPending(true);

        const error = await addItem(productVariant.id);

        if (error) {
          // Trigger the error boundary in the root error.js
          throw new Error(error.toString());
        }

        setPendingVariants(pendingVariants.filter((variant) => variant !== productVariant.id));
        // setIsPending(false);

        router.refresh();
      }}
      variant={productVariant.availableForSale ? 'glassmorphism' : 'ghost'}
      size="icon"
    >
      {!isPending ? (
        <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
      ) : (
        <LoadingDots className="mb-3 bg-white" />
      )}
    </Button>
  );
}
