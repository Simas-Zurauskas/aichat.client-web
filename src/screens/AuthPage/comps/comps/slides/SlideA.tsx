import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Div = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  .image-container {
    position: relative;
    img {
      max-height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .label {
    max-width: 600px !important;
    margin-top: 75px;
    color: ${({ theme }) => theme.colors.textWhite};
    align-self: flex-start;
  }
`;

interface SlideAProps {}

export const SlideA: React.FC<SlideAProps> = () => {
  return (
    <Div>
      <div className="image-container">
        <img src="/slide_a.png" alt="" />
      </div>

      <Typography className="label" variant="body1">
        Lorem ipsum dolor sit amet consectetur. Tellus nunc felis lobortis aliquet nec. Sagittis porta tortor pretium
        morbi ornare viverra.
      </Typography>
    </Div>
  );
};
