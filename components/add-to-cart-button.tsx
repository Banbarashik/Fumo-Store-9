import LoadingDots from '@/components/loading-dots';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/navigation';

import { addItem } from '@/components/cart/actions';

export default function AddToCartButton({
  isVariantAvailable,
  className,
  addVariantToPending,
  removeVariantFromPending,
  isPending,
  variantId
}: {
  isVariantAvailable: boolean;
  className?: string;
  addVariantToPending: () => void;
  removeVariantFromPending: () => void;
  isPending: boolean;
  variantId: string;
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

        addVariantToPending();

        const error = await addItem(variantId);

        if (error) {
          // Trigger the error boundary in the root error.js
          throw new Error(error.toString());
        }

        removeVariantFromPending();

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
