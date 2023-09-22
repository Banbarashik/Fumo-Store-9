'use client';

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
          variants: { id: string; title: string }[];
        };
      },
      variant
    ) => {
      const optAndVarTitleRegex = /(\w+)_(.+)/;
      const optAndVarTitle = optAndVarTitleRegex.exec(variant.title);
      if (optAndVarTitle === null) return accumulator;
      const [, optTitle, varTitle] = optAndVarTitle;
      if (!optTitle || !varTitle) return accumulator;

      return {
        ...accumulator,
        [optTitle]: {
          variants: accumulator[optTitle]?.variants
            ? [...accumulator[optTitle]!.variants, { id: variant.id, title: varTitle }]
            : [{ id: variant.id, title: varTitle }]
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
          const optSearchParams = new URLSearchParams(searchParams.toString());
          optSearchParams.set(optNameLowerCase, `${optTitle} ${variant.title}`);
          const optUrl = createUrl(pathname, optSearchParams);

          return (
            <button
              key={variant.id}
              onClick={() => {
                router.replace(optUrl, { scroll: false });
              }}
              className={
                'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900'
              }
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
