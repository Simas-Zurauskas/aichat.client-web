import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const Div = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  .image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &__main {
      border-radius: 16px;
      max-height: 500px;
      /* width: 100%; */

      /* object-fit: cover; */
    }
    &__sub {
      position: absolute;
      bottom: -0px;
      right: -40px;
      width: 50%;
      filter: drop-shadow(-4px -4px 10px rgba(0, 0, 50, 0.15));

      &:nth-of-type(2) {
        left: -120px;
        bottom: 140px;
      }
    }
  }

  .text-container {
    align-self: flex-start;
    &__value {
      max-width: 460px !important;
      color: ${({ theme }) => theme.colors.textWhite};
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .image-container {
      &__sub {
        right: -10px;
      }
    }
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    .image-container {
      &__main {
        max-height: 360px !important;
      }
      &__sub {
        &:nth-of-type(2) {
          left: -60px;
        }
      }
    }
  }
`;

interface SlideCProps {
  isActive: boolean;
}

export const SlideC: React.FC<SlideCProps> = ({ isActive }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Div>
      <div
        className="image-container"
        style={{
          overflow: !isActive ? 'hidden' : 'visible',
        }}
      >
        <img className="image-container__main" src="/slide_c.png" alt="" />
        <motion.img
          initial={{ y: 200 }}
          animate={{
            y: isActive ? 0 : 200,
            transition: {
              type: 'spring',
              damping: 11,
              stiffness: 50,
              restDelta: 0.0001,
              restSpeed: 0.0001,
            },
          }}
          className="image-container__sub"
          src="/docx.png"
          alt=""
        />
        <motion.img
          initial={{ y: -200 }}
          animate={{
            y: isActive ? 0 : -200,
            transition: {
              type: 'spring',
              damping: 11,
              stiffness: 50,
              restDelta: 0.0001,
              restSpeed: 0.0001,
            },
          }}
          className="image-container__sub"
          src="/pdf.png"
          alt=""
        />
      </div>
    </Div>
  );
};
