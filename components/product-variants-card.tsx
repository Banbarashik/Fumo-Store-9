'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { ProductVariant } from '@/lib/shopify/types';

import AddToCartButton from '@/components/add-to-cart-button';
import Price from '@/components/price';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ListBulletIcon } from '@heroicons/react/24/outline';

export default function ProductVariantsCard({
  ...props
}: {
  variants: ProductVariant[];
  productHandle: string;
  hasPseudoOptions?: boolean;
}) {
  // const [isPending, setIsPending] = useState(false);
  const [pendingVariants, setPendingVariants] = useState<string[]>([]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild className="absolute right-6 top-4">
        <Button variant="glassmorphism" size="icon" aria-label="Show variants">
          <ListBulletIcon className="h-6" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <ProductVariantsCardPodsos
          {...props}
          pendingVariants={pendingVariants}
          setPendingVariants={setPendingVariants}
        />
      </HoverCardContent>
    </HoverCard>
  );
}

function ProductVariantsCardPodsos({
  variants,
  ...props
}: {
  variants: ProductVariant[];
  productHandle: string;
  hasPseudoOptions?: boolean;
  pendingVariants: string[];
  setPendingVariants: any;
}) {
  return (
    <ul>
      {variants.map((variant: ProductVariant, i, arr) => (
        <li
          title={variant.availableForSale ? '' : 'Out of stock'}
          key={variant.id}
          className={clsx(
            'rounded-sm border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900',
            {
              'mb-4': i + 1 < arr.length, // don't add a margin to the last element of the list
              'hover:border-blue-600': variant.availableForSale,
              'relative z-10 cursor-not-allowed overflow-hidden text-neutral-500 before:absolute before:left-1/2 before:right-0 before:top-1/2 before:-z-10 before:h-px before:-translate-x-1/2 before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:text-neutral-400 dark:ring-neutral-700 dark:before:bg-neutral-700 [&_*]:cursor-not-allowed':
                !variant.availableForSale
            }
          )}
        >
          <ProductVariantsCardItem variant={variant} {...props} />
        </li>
      ))}
    </ul>
  );
}

function ProductVariantsCardItem({
  variant,
  productHandle,
  hasPseudoOptions,
  pendingVariants,
  setPendingVariants
}: {
  variant: ProductVariant;
  productHandle: string;
  hasPseudoOptions?: boolean;
  pendingVariants: string[];
  setPendingVariants: any;
}) {
  const router = useRouter();

  const params = new URLSearchParams();
  variant.selectedOptions.forEach((option) =>
    params.append(option.name.toLowerCase(), option.value)
  );
  const paramsString = params.toString();

  const optAndVarTitleRegex = /(\w+)_(.+)/;
  const optAndVarTitle = optAndVarTitleRegex.exec(variant.title);

  const title =
    !hasPseudoOptions || optAndVarTitle === null
      ? variant.title
      : `${optAndVarTitle[1]!.toUpperCase()}: ${optAndVarTitle[2]}`;

  const isPending = pendingVariants.some((variantId) => variantId === variant.id);

  return (
    <Link
      href={`/product/${productHandle}?${paramsString}`}
      className={clsx('flex gap-6 px-3 py-4', {
        'pointer-events-none': !variant.availableForSale
      })}
    >
      <Image
        src={variant.image.url}
        alt={variant.image.altText || variant.title}
        width={80}
        height={80}
        className={clsx('h-20 w-20 rounded-sm object-cover', {
          'opacity-50': !variant.availableForSale
        })}
      />
      <div className="flex flex-col justify-between">
        <p>{title}</p>
        <Price
          className={clsx('w-fit rounded-full p-2', {
            'bg-blue-600 text-white': variant.availableForSale,
            'bg-blue-800 text-neutral-400': !variant.availableForSale
          })}
          amount={variant.price.amount}
          currencyCode={variant.price.currencyCode}
        />
      </div>
      <AddToCartButton
        addVariantToPending={() => setPendingVariants((arr: string[]) => [...arr, variant.id])}
        removeVariantFromPending={() =>
          setPendingVariants((arr: string[]) => arr.filter((variantId) => variantId !== variant.id))
        }
        variantId={variant.id}
        isPending={isPending}
        isVariantAvailable={variant.availableForSale}
        className="ml-auto"
      />
    </Link>
  );
}
