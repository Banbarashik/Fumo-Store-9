import clsx from 'clsx';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function VariantSelectorWithPseudoOptions({
  option,
  variants,
  syncSlider
}: {
  option: ProductOption | undefined;
  variants: ProductVariant[];
  syncSlider: (index: number) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasNoOptionOrJustOneVariant = !option || option.values.length === 1;

  if (hasNoOptionOrJustOneVariant) {
    return null;
  }

  const optionNameLowerCase = option.name.toLowerCase();

  useEffect(function () {
    const variantIsSelected = searchParams.has(optionNameLowerCase);

    if (variantIsSelected) {
      const selectedVariant = searchParams.get(optionNameLowerCase);
      const index = variants.findIndex((variant) => variant.title === selectedVariant);
      syncSlider(index);
    } else {
      const firstVariantSearchParams = new URLSearchParams();
      firstVariantSearchParams.set(optionNameLowerCase, option.values[0]!);

      const firstVariantURL = createUrl(pathname, firstVariantSearchParams);

      router.replace(firstVariantURL);
    }
  }, []);

  const variantsObj = variants.reduce(
    (
      accumulator: {
        [optTitle: string]: {
          variants: {
            index: number;
            id: string;
            title: string;
            titleWithOpt: string;
            availableForSale: boolean;
          }[];
        };
      },
      variant,
      i
    ) => {
      const optAndVarTitleRegex = /(\w+)_(.+)/;
      const optAndVarTitle = optAndVarTitleRegex.exec(variant.title);
      if (optAndVarTitle === null) return accumulator;

      const optTitle = optAndVarTitle[1]!;
      const varTitle = optAndVarTitle[2]!;

      const variantObj = {
        index: i,
        id: variant.id,
        title: varTitle,
        titleWithOpt: variant.title,
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

  const variantsArr = Object.entries(variantsObj);

  return variantsArr.map(([optTitle, { variants }]) => (
    <dl className="mb-8" key={optTitle}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{optTitle}</dt>
      <dd className="flex flex-wrap gap-3">
        {variants.map(function (variant) {
          const optSearchParams = new URLSearchParams(searchParams.toString());
          optSearchParams.set(optionNameLowerCase, variant.titleWithOpt);
          const optUrl = createUrl(pathname, optSearchParams);

          const isActive = searchParams.get(optionNameLowerCase) === variant.titleWithOpt;

          return (
            <button
              key={variant.id}
              aria-disabled={!variant.availableForSale}
              disabled={!variant.availableForSale}
              title={!variant.availableForSale ? 'Out of Stock' : ''}
              onClick={() => {
                syncSlider(variant.index);
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
}
