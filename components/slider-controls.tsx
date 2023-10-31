import clsx from 'clsx';

import { KeenSliderInstance } from 'keen-slider/react';

import { Button } from '@/components/ui/button';
import Chevron from '@/components/ui/chevron';

export default function SliderControls({
  instanceRefCurrent,
  currentSlide,
  outside = false
}: {
  instanceRefCurrent: KeenSliderInstance;
  currentSlide: number;
  outside?: boolean;
}) {
  const className = (direction: 'left' | 'right') =>
    clsx('absolute top-1/2 h-12 -translate-y-1/2', {
      'left-4': !outside && direction === 'left',
      'right-4': !outside && direction === 'right',
      '-left-4 -translate-x-full': outside && direction === 'left',
      '-right-4 translate-x-full': outside && direction === 'right'
    });

  return (
    <>
      <Button
        className={className('left')}
        disabled={currentSlide === 0}
        variant={currentSlide === 0 ? 'ghost' : 'outline'}
        onClick={() => instanceRefCurrent.prev()}
      >
        <Chevron width={30} height={30} direction="left" />
      </Button>
      <Button
        className={className('right')}
        disabled={currentSlide === instanceRefCurrent.track.details.maxIdx}
        variant={currentSlide === instanceRefCurrent.track.details.maxIdx ? 'ghost' : 'outline'}
        onClick={() => instanceRefCurrent.next()}
      >
        <Chevron width={30} height={30} direction="right" />
      </Button>
    </>
  );
}
