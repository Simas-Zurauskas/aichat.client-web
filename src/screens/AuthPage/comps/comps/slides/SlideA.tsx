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
    &__main {
      border-radius: 16px;
      max-height: 100%;
      width: 100%;
      object-fit: cover;
    }
    &__sub {
      position: absolute;
      bottom: -40px;
      right: -40px;
      width: 70%;
      filter: drop-shadow(-4px -4px 10px rgba(0, 0, 50, 0.15));
    }
  }

  .text-container {
    padding-top: 70px;
    align-self: flex-start;
    &__value {
      max-width: 660px !important;
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
        max-height: 260px !important;
      }
    }
  }
`;

interface SlideAProps {
  isActive: boolean;
}

export const SlideA: React.FC<SlideAProps> = ({ isActive }) => {
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
        <img className="image-container__main" src="/slide_a.png" alt="" />
        <motion.img
          initial={{ x: 300 }}
          animate={{
            x: isActive ? 0 : 300,
            transition: {
              type: 'spring',
              damping: 11,
              stiffness: 50,
              restDelta: 0.0001,
              restSpeed: 0.0001,
            },
          }}
          className="image-container__sub"
          src="/llms.png"
          alt=""
        />
      </div>

      <motion.div
        className="text-container"
        initial={{ x: 150 }}
        animate={{
          x: isActive ? 0 : 150,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <Typography
          className="text-container__value"
          variant={isMd ? 'body2' : 'body1'}
          style={{ color: colors.textWhite }}
        >
          ProMax.AI gives you the power to harness the strengths of world-class AI models: GPT-4o, Gemini 1.5 Pro,
          DeepSeek V3, and DeepSeek R1. Tailor each instance to perfection with custom contexts, response styles, and
          settings—all displayed in an intuitive, user-friendly interface.
        </Typography>
      </motion.div>
    </Div>
  );
};
