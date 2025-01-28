import styled from '@emotion/styled';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { SlideA, SlideB } from './slides';
import { Box } from '@mui/material';
import { useState } from 'react';

const Div = styled.div`
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 65% !important;
  }

  [class^='number-slide'],
  [class*=' number-slide'] {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${({ theme }) => theme.breakpoints.down('lg')} {
    .content {
      max-width: 80% !important;
    }
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    .content {
      max-width: 90% !important;
    }
  }
`;

interface SliderProps {}

export const Slider: React.FC<SliderProps> = () => {
  const [slide, setSlide] = useState(0);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged: (slider) => {
        console.log(slider.track);
        setSlide(slider.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ],
  );

  console.log('SLIDE', slide);

  return (
    <>
      <Div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">
          <div className="content">
            <SlideA isActive={slide === 0} />
          </div>
        </div>
        <div className="keen-slider__slide number-slide2">
          <div className="content">
            <SlideB isActive={slide === 1} />
          </div>
        </div>
        <div className="keen-slider__slide number-slide3">
          <div className="content">
            <SlideB isActive={slide === 2} />
          </div>
        </div>
      </Div>
      {/* <Box mb={16} /> */}
    </>
  );
};
