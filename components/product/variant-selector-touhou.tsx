'use client';

import clsx from 'clsx';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  const variantsObj = variants.reduce(
    (
      accumulator: {
        [optTitle: string]: {
          variants: { id: string; title: string; availableForSale: boolean }[];
        };
      },
      variant
    ) => {
      const optAndVarTitleRegex = /(\w+)_(.+)/;
      const optAndVarTitle = optAndVarTitleRegex.exec(variant.title);
      if (optAndVarTitle === null) return accumulator;

      const [, optTitle, varTitle] = optAndVarTitle;
      if (!optTitle || !varTitle) return accumulator;

      const variantObj = {
        id: variant.id,
        title: varTitle,
        availableForSale: variant.availableForSale
      };

      return {
        ...accumulator,
        [optTitle]: {
          variants: accumulator[optTitle]?.variants
            ? [...accumulator[optTitle]!.variants, variantObj]
            : [variantObj]
        }
      };
    },
    {}
  );

  // console.log(variantsObj);

  const variantsArr = Object.entries(variantsObj);

  const markup = variantsArr.map(([optTitle, variants]) => (
    <dl className="mb-8" key={optTitle}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{optTitle}</dt>
      <dd className="flex flex-wrap gap-3">
        {variants.variants.map((variant) => {
          const optNameLowerCase = options[0]!.name.toLowerCase();
          const variantName = `${optTitle} ${variant.title}`;
          const optSearchParams = new URLSearchParams(searchParams.toString());
          optSearchParams.set(optNameLowerCase, variantName);
          const optUrl = createUrl(pathname, optSearchParams);

          const isActive = searchParams.get(optNameLowerCase) === variantName;

          return (
            <button
              key={variant.id}
              aria-disabled={!variant.availableForSale}
              disabled={!variant.availableForSale}
              title={!variant.availableForSale ? 'Out of Stock' : ''}
              onClick={() => {
                router.replace(optUrl, { scroll: false });
              }}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                {
                  'cursor-default ring-2 ring-blue-600': isActive,
                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
                    !isActive && variant.availableForSale,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                    !variant.availableForSale
                }
              )}
            >
              {variant.title}
            </button>
          );
        })}
      </dd>
    </dl>
  ));

  return markup;
}
