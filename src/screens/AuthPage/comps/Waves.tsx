import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useStateSelector } from '@/state';

const moveForever = keyframes`
  0% {
    transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
`;

const Wrap = styled.div``;

const WavesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  min-height: 100px;
  max-height: 150px;

  @media (max-width: 768px) {
    height: 40px;
    min-height: 40px;
  }
`;

const WavesSVG = styled.svg`
  width: 100%;
  height: 100%;
  shape-rendering: auto;
`;

const Parallax = styled.g`
  & > use {
    animation: ${moveForever} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }

  & > use:nth-of-type(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  & > use:nth-of-type(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  & > use:nth-of-type(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  & > use:nth-of-type(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }

  & > use:nth-of-type(5) {
    animation-delay: -2s;
    animation-duration: 7s;
    animation-direction: reverse;
  }
  & > use:nth-of-type(6) {
    animation-delay: -3s;
    animation-duration: 10s;
    animation-direction: reverse;
  }
  & > use:nth-of-type(7) {
    animation-delay: -4s;
    animation-duration: 13s;
    animation-direction: reverse;
  }
  & > use:nth-of-type(8) {
    animation-delay: -5s;
    animation-duration: 20s;
    animation-direction: reverse;
  }
`;

export const Waves = () => {
  const colors = useStateSelector(({ theme }) => theme.colors);
  return (
    <Wrap>
      <WavesContainer>
        <WavesSVG
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          className="waves"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <Parallax className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill={colors.wave1} />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill={colors.wave2} />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill={colors.wave3} />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill={colors.wave4} />
          </Parallax>
        </WavesSVG>
      </WavesContainer>
    </Wrap>
  );
};
