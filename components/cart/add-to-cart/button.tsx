import { Button } from '@/components/ui/button';
import LoadingDots from '@/components/ui/loading-dots';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/navigation';

import { addItem } from '@/components/cart/actions';

export default function AddToCartButton({
  isPending,
  variantId,
  isVariantAvailable,
  setAsPending,
  setAsAdded,
  className
}: {
  isPending: boolean;
  variantId: string;
  isVariantAvailable: boolean;
  setAsPending: () => void;
  setAsAdded: () => void;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Button
      aria-label="Add to cart"
      className={className}
      onClick={async (e) => {
        e.preventDefault();

        // Safeguard in case someone messes with `disabled` in devtools.
        if (!isVariantAvailable || !variantId) return;

        setAsPending();

        const error = await addItem(variantId);

        if (error) {
          // Trigger the error boundary in the root error.js
          throw new Error(error.toString());
        }

        setAsAdded();

        router.refresh();
      }}
      variant={isVariantAvailable ? 'glassmorphism' : 'ghost'}
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
