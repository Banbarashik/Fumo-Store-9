'use client';

import Image from 'next/image';

import { AddToCart } from '@/components/product/add-to-cart';
// import { Gallery } from '@/components/product/gallery';
import Price from '@/components/ui/price';
import Prose from '@/components/ui/prose';
import { Money, Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { VariantSelectorWithPseudoOptions } from './variant-selector-pseudo-options';

import { ThumbnailPlugin } from '@/lib/keen-slider';
import { useKeenSlider } from 'keen-slider/react';

export function ProductDescription({
  product,
  selectedVariantPrice
}: {
  product: Product;
  selectedVariantPrice: Money;
}) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    created() {
      console.log('slider created');
    }
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 6,
        spacing: 10
      }
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const hasPseudoOptions = product.tags.includes('pseudo_options');

  const images = product.variants.map((variant) => ({
    src: variant.image.url,
    altText: variant.image.altText,
    selectedOptions: variant.selectedOptions
  }));

  return (
    <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
      {/* <Gallery
          images={product.variants.map((variant) => ({
            src: variant.image.url,
            altText: variant.image.altText,
            selectedOptions: variant.selectedOptions
          }))}
        /> */}
      <div className="flex basis-full flex-col gap-6 lg:max-w-2/3">
        <div ref={sliderRef} className="keen-slider basis-4/5">
          {images.map((image) => (
            <div key={image.src} className="keen-slider__slide relative h-full w-full">
              <Image
                src={image.src}
                alt={image.altText || ''}
                className="object-contain"
                sizes="(min-width: 1024px) 66vw, 100vw"
                fill
                priority
              />
            </div>
          ))}
        </div>
        <div ref={thumbnailRef} className="keen-slider thumbnail basis-1/5">
          {images.map((image) => (
            <div className="keen-slider__slide relative">
              <Image
                className="
                object-contain
              "
                key={image.src}
                src={image.src}
                alt={image.altText || ''}
                // width={80}
                // height={128}
                fill
              />
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
          <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
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
