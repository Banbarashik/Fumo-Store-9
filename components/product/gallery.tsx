'use client';

import clsx from 'clsx';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState } from 'react';

import { ThumbnailPlugin } from '@/lib/keen-slider';

import SliderControls from '@/components/slider-controls';

export function Gallery({
  images,
  mountSliderRefToParent
}: {
  images: {
    src: string;
    altText: string | null;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    caption: string;
  }[];
  mountSliderRefToParent: any;
}) {
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setSliderLoaded(true);
      mountSliderRefToParent(slider);
    }
  });

  const [thumbnailCurrentSlide, setThumbnailCurrentSlide] = useState(0);
  const [thumbnailRef, thumbnailInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: images.length >= 3 ? 3 : images.length,
        spacing: 10
      },
      breakpoints: {
        '(min-width: 640px)': {
          slides: {
            perView: images.length >= 4 ? 4 : images.length,
            spacing: 10
          }
        }
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

  return (
    <div className="flex basis-full flex-col items-center gap-6 lg:max-w-2/3">
      <div className="relative aspect-square max-h-[550px] w-full">
        <div ref={sliderRef} className="keen-slider h-full">
          {images.map((image, _, arr) => (
            <figure key={image.src} className="keen-slider__slide relative h-full w-full">
              <Image
                src={image.src}
                alt={image.altText || ''}
                className="object-contain"
                sizes="(min-width: 1024px) 66vw, 100vw"
                fill
                priority
              />
              {arr.length > 1 && (
                <figcaption className="absolute bottom-5 left-1/2 w-max -translate-x-1/2 bg-black/50 px-3 py-1 text-xs text-white sm:text-base">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
        {images.length > 1 && sliderLoaded && instanceRef.current && (
          <SliderControls
            className="hidden sm:inline-flex"
            instanceRefCurrent={instanceRef.current}
            currentSlide={currentSlide}
          />
        )}
      </div>

      {images.length > 1 && (
        <div
          className={clsx('relative basis-24', {
            'w-full sm:w-4/5': images.length >= 4,
            'w-full sm:w-1/2': images.length === 3,
            'w-4/5 sm:w-2/5': images.length === 2
          })}
        >
          <div ref={thumbnailRef} className="keen-slider thumbnail h-full">
            {images.map((image) => (
              <div
                key={image.src}
                className="keen-slider__slide relative aspect-square h-full cursor-pointer"
              >
                <Image className="object-cover" src={image.src} alt={image.altText || ''} fill />
              </div>
            ))}
          </div>
          {images.length > 4 && thumbnailLoaded && thumbnailInstanceRef.current && (
            <SliderControls
              className="hidden sm:inline-flex"
              outside
              instanceRefCurrent={thumbnailInstanceRef.current}
              currentSlide={thumbnailCurrentSlide}
            />
          )}
        </div>
      )}
    </div>
  );
}
