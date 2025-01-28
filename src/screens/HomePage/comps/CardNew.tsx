import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { ButtonBase, Typography } from '@mui/material';

const Div = styled(ButtonBase)`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  overflow: hidden;
  display: flex;

  height: 100%;
  min-height: 216px;

  &:hover {
    background: ${({ theme }) => theme.colors.shade};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    min-height: 200px;
  }
`;

interface CardNewProps {
  onClick: () => void;
}

export const CardNew: React.FC<CardNewProps> = ({ onClick }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);

  return (
    <Div onClick={onClick}>
      <Typography color="primary" variant="h3" style={{ color: colors.blue, fontWeight: 500 }}>
        + Create new
      </Typography>
    </Div>
  );
};
