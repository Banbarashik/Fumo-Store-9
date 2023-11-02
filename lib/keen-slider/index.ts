import { KeenSliderInstance, KeenSliderPlugin } from 'keen-slider';
import { MutableRefObject } from 'react';

export function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('border-2', 'border-blue-600');
      });
    }
    function addActive(idx: number) {
      // TODO: find out how to correctly handle the 'Object is possibly undefined' problem
      //! the non-null assertion is a temporary solution
      slider.slides[idx]!.classList.add('border-2', 'border-blue-600');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}
