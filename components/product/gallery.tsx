import clsx from 'clsx';
import { KeenSliderInstance, useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

import { ThumbnailPlugin } from '@/lib/keen-slider';

import SliderControls from '@/components/slider-controls';

export default function Gallery({
  images,
  mountSlider
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
  mountSlider: Dispatch<SetStateAction<KeenSliderInstance | null>>;
}) {
  const searchParams = useSearchParams();

  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, sliderInstanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setSliderLoaded(true);
      mountSlider(slider);
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

        const selectedVariant = searchParams.get(images[0]!.selectedOptions[0]!.name.toLowerCase());
        const index = images.findIndex(
          (image) => image.selectedOptions[0]!.value === selectedVariant
        );
        sliderInstanceRef.current?.moveToIdx(index);
      }
    },
    [ThumbnailPlugin(sliderInstanceRef)]
  );

  return (
    <div className="flex basis-full flex-col items-center gap-6 lg:max-w-2/3">
      <div className="relative aspect-square max-h-[550px] w-full">
        {/* SLIDER */}
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
        {images.length > 1 && sliderLoaded && sliderInstanceRef.current && (
          <SliderControls
            className="hidden sm:inline-flex"
            instanceRefCurrent={sliderInstanceRef.current}
            currentSlide={currentSlide}
          />
        )}
      </div>

      {/* THUMBNAIL SLIDER */}
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

          {/* THUMBNAIL SLIDER CONTROLS */}
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
