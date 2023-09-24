'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({
  images
}: {
  images: {
    src: string;
    altText: string | null;
    selectedOptions: { name: string; value: string }[];
  }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentImage] = images.filter((image) =>
    image.selectedOptions.every(function (option) {
      const optionNameLowerCase = option.name.toLowerCase();
      return searchParams.get(optionNameLowerCase) === option.value;
    })
  );

  const currentImageIndex = images.findIndex((image) => image.src === currentImage?.src);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
  images[previousImageIndex]?.selectedOptions.forEach(function (option) {
    const optionNameLowerCase = option.name.toLowerCase();
    return previousSearchParams.set(optionNameLowerCase, option.value);
  });
  const previousUrl = createUrl(pathname, previousSearchParams);

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = currentImageIndex + 1 < images.length ? currentImageIndex + 1 : 0;
  images[nextImageIndex]?.selectedOptions.forEach(function (option) {
    const optionNameLowerCase = option.name.toLowerCase();
    return nextSearchParams.set(optionNameLowerCase, option.value);
  });
  const nextUrl = createUrl(pathname, nextSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {images.length > 0 && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={currentImage?.altText || images[0]!.altText || ''}
            src={currentImage?.src || images[0]!.src}
            priority={true}
          />
        )}

        {images.length > 1 && (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <Link
                aria-label="Previous product image"
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowLeftIcon className="h-5" />
              </Link>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <Link
                aria-label="Next product image"
                href={nextUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowRightIcon className="h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map(function (image) {
            const isActive = image.selectedOptions === currentImage?.selectedOptions;
            const imageSearchParams = new URLSearchParams(searchParams.toString());

            image.selectedOptions.forEach(function (option) {
              const optionNameLowerCase = option.name.toLowerCase();
              imageSearchParams.set(optionNameLowerCase, option.value);
            });

            return (
              <li key={image.src} className="h-20 w-20">
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText || 'Product image'}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
