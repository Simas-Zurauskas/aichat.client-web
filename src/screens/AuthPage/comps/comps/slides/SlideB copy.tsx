import styled from '@emotion/styled';
import { Typography } from '@mui/material';
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
    width: 100%;
    &__main {
      border-radius: 16px;
      width: 100%;
      height: 400px;
      background-color: #f0f0f0;
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
      max-width: 600px !important;
      color: ${({ theme }) => theme.colors.textWhite};
    }
  }
`;

interface SlideBProps {
  isActive: boolean;
}

export const SlideB: React.FC<SlideBProps> = ({ isActive }) => {
  return (
    <Div>
      <div className="image-container">
        <div className="image-container__main">game of life</div>
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
        <Typography className="text-container__value" variant="body1">
          Lorem ipsum dolor sit amet consectetur. Tellus nunc felis lobortis aliquet nec. Sagittis porta tortor pretium
          morbi ornare viverra.
        </Typography>
      </motion.div>
    </Div>
  );
};
