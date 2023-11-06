import clsx from 'clsx';

import { ShoppingCartIcon } from 'lucide-react';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border-neutral-200 text-black transition-colors dark:border-blue-200 dark:text-blue-200">
      <ShoppingCartIcon className={clsx('transition-all ease-in-out hover:scale-110', className)} />

      {quantity ? (
        <div className="absolute right-0 top-0 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border border-black text-[11px] font-medium text-black dark:border-blue-200 dark:text-blue-200">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
