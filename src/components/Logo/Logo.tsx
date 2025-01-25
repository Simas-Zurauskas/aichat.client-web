import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Div = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
`;

interface LogoProps {
  colorOverride?: string;
}

export const Logo: React.FC<LogoProps> = ({ colorOverride }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);

  return (
    <Div>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.75 11.4795V24.5205L18 31.0335L29.25 24.5205V11.4795L18 4.9665L6.75 11.4795ZM18 1.5L32.25 9.75V26.25L18 34.5L3.75 26.25V9.75L18 1.5ZM9.7485 14.955L16.5 18.8655V26.439H19.5V18.8655L26.2515 14.958L24.7485 12.3615L18 16.2675L11.2515 12.36L9.7485 14.955Z"
          fill={colorOverride || colors.text}
        />
      </svg>
      <Typography variant="h6" fontWeight={600} style={{ color: colorOverride || colors.text }}>
        ProMax.AI
      </Typography>
    </Div>
  );
};
