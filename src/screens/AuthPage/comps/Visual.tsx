import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Slider } from './comps';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

interface VisualProps {}

export const Visual: React.FC<VisualProps> = () => {
  const colors = useStateSelector(({ theme }) => theme.colors);
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <Div>
      {!isMd && (
        <>
          <Typography variant="h2" style={{ color: colors.textWhite }}>
            Unlock the Power of AI with ProMax.AI
          </Typography>
          <Box mb={isMd ? 4 : 8} />
        </>
      )}
      <Slider />
    </Div>
  );
};
