import { KeenSliderInstance } from 'keen-slider/react';

import { Button } from '@/components/ui/button';
import Chevron from '@/components/ui/chevron';

export default function SliderControls({
  instanceRefCurrent,
  currentSlide
}: {
  instanceRefCurrent: KeenSliderInstance;
  currentSlide: number;
}) {
  return (
    <>
      <Button
        className="absolute left-4 top-1/2 h-12 -translate-y-1/2"
        disabled={currentSlide === 0}
        variant={currentSlide === 0 ? 'ghost' : 'outline'}
        onClick={() => instanceRefCurrent.prev()}
      >
        <Chevron width={30} height={30} direction="left" />
      </Button>
      <Button
        className="absolute right-4 top-1/2 h-12 -translate-y-1/2"
        disabled={currentSlide === instanceRefCurrent.track.details.slides.length - 1}
        variant={
          currentSlide === instanceRefCurrent.track.details.slides.length - 1 ? 'ghost' : 'outline'
        }
        onClick={() => instanceRefCurrent.next()}
      >
        <Chevron width={30} height={30} direction="right" />
      </Button>
    </>
  );
}
