'use client';

import { ProductOption, ProductVariant } from 'lib/shopify/types';
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

  const varObj = variants.reduce(
    (
      accumulator: {
        [optName: string]: {
          title: string;
          variants: string[];
        };
      },
      variant
    ) => {
      // get the option part of the variant's title
      // display it as a <dt>
      // collect variants under one entity united by its option name
      const optNameRegex = /\w+(?=_)/;
      const optNameArr = optNameRegex.exec(variant.title);

      if (optNameArr === null) return accumulator; // protection from null

      const [optName] = optNameArr;

      return {
        ...accumulator,
        [optName]: {
          title: optName,
          variants: accumulator[optName]?.variants
            ? [...accumulator[optName]!.variants, variant.title]
            : [variant.title]
        }
      };
    },
    {}
  );

  console.log(varObj);

  return <></>;
}
