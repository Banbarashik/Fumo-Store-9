'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState } from 'react';

import { ThumbnailPlugin } from '@/lib/keen-slider';
import { Money, Product } from '@/lib/shopify/types';

import { AddToCart } from '@/components/product/add-to-cart';
import { VariantSelector } from '@/components/product/variant-selector';
import { VariantSelectorWithPseudoOptions } from '@/components/product/variant-selector-pseudo-options';
import SliderControls from '@/components/slider-controls';
import Price from '@/components/ui/price';
import Prose from '@/components/ui/prose';

export function ProductDescription({
  product,
  selectedVariantPrice
}: {
  product: Product;
  selectedVariantPrice: Money;
}) {
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setSliderLoaded(true);
    }
  });

  const [thumbnailCurrentSlide, setThumbnailCurrentSlide] = useState(0);
  const [thumbnailRef, thumbnailInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 4,
        spacing: 10
      },
      slideChanged(slider) {
        setThumbnailCurrentSlide(slider.track.details.rel);
      },
      created() {
        setThumbnailLoaded(true);
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
      <div className="flex basis-full flex-col items-center gap-6 lg:max-w-2/3">
        <div className="relative w-full basis-4/5">
          <div ref={sliderRef} className="keen-slider h-full">
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
          {sliderLoaded && instanceRef.current && (
            <SliderControls instanceRefCurrent={instanceRef.current} currentSlide={currentSlide} />
          )}
        </div>
        <div className="relative w-1/2 basis-1/5">
          <div ref={thumbnailRef} className="keen-slider thumbnail h-full">
            {images.map((image) => (
              <div key={image.src} className="keen-slider__slide relative">
                <Image className="object-cover" src={image.src} alt={image.altText || ''} fill />
              </div>
            ))}
          </div>
          {thumbnailLoaded && thumbnailInstanceRef.current && (
            <SliderControls
              outside
              instanceRefCurrent={thumbnailInstanceRef.current}
              currentSlide={thumbnailCurrentSlide}
            />
          )}
        </div>
      </div>

      <div>
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
            syncSlider={(index) => instanceRef.current?.moveToIdx(index)}
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
