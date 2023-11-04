'use client';

import { KeenSliderInstance } from 'keen-slider/react';
import { useState } from 'react';

import { Money, Product, ProductVariant } from '@/lib/shopify/types';

import { AddToCart } from '@/components/product/add-to-cart';
import { Gallery } from '@/components/product/gallery';
import { VariantSelector } from '@/components/product/variant-selector';
import { VariantSelectorWithPseudoOptions } from '@/components/product/variant-selector-pseudo-options';
import Price from '@/components/ui/price';
import Prose from '@/components/ui/prose';

export function ProductDescription({
  product,
  selectedVariantPrice
}: {
  product: Product;
  selectedVariantPrice: Money;
}) {
  const [sliderInstance, setSliderInstance] = useState<KeenSliderInstance | null>(null);

  const hasPseudoOptions = product.tags.includes('pseudo_options');

  const images = product.variants.map(function (variant: ProductVariant) {
    const optAndVarTitleRegex = /(\w+)_(.+)/;
    const optAndVarTitle = optAndVarTitleRegex.exec(variant.title);

    const title =
      !hasPseudoOptions || optAndVarTitle === null
        ? variant.title
        : `${optAndVarTitle[1]!.toUpperCase()}: ${optAndVarTitle[2]}`;

    return {
      src: variant.image.url,
      altText: variant.image.altText,
      selectedOptions: variant.selectedOptions,
      caption: title
    };
  });

  return (
    <div className="flex flex-col gap-8 rounded-b-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black sm:rounded-t-lg sm:p-8 md:p-12 lg:flex-row">
      <div className="flex items-center justify-between border-b pb-4 dark:border-neutral-700 lg:hidden">
        <h1 className="text-xl font-medium">{product.title}</h1>
        <div className="w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={selectedVariantPrice.amount}
            currencyCode={selectedVariantPrice.currencyCode}
          />
        </div>
      </div>

      <Gallery images={images} mountSlider={setSliderInstance} />

      <div className="lg:basis-2/6">
        <div className="mb-6 hidden flex-col border-b pb-6 dark:border-neutral-700 lg:flex">
          <h1 className="mb-2 text-4xl font-medium">{product.title}</h1>
          <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
            <Price
              amount={selectedVariantPrice.amount}
              currencyCode={selectedVariantPrice.currencyCode}
            />
          </div>
        </div>
        {!hasPseudoOptions ? (
          <VariantSelector options={product.options} variants={product.variants} />
        ) : (
          <VariantSelectorWithPseudoOptions
            syncSlider={(index) => sliderInstance?.moveToIdx(index)}
            option={product.options[0]}
            variants={product.variants}
          />
        )}
        {product.descriptionHtml ? (
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product.descriptionHtml}
          />
        ) : null}
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </div>
    </div>
  );
}
