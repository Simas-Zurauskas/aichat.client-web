import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
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
  return (
    <Div>
      {/* <Typography variant="h2" style={{ color: colors.textWhite }}>
        Welcome to the ProMax.AI!
      </Typography>
      <Box mb={10} />
      <Typography variant="body1" style={{ color: colors.textWhite }}>
        more text
      </Typography> */}

      <Typography variant="h2" style={{ color: colors.textWhite }}>
        Unlock the Power of AI with ProMax.AI
      </Typography>
      <Box mb={1} />
      <Typography variant="h6" fontWeight={400} style={{ color: colors.textWhite }}>
        Your Personal AI Workspace for Smarter Conversations
      </Typography>
      <Box mb={8} />
      <Slider />
    </Div>
  );
};
