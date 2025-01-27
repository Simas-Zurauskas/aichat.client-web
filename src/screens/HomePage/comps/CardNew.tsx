import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { ButtonBase, Typography } from '@mui/material';

const Div = styled(ButtonBase)`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  overflow: hidden;
  display: flex;
  background: #e5f1ff;
`;

interface CardNewProps {
  onClick: () => void;
}

export const CardNew: React.FC<CardNewProps> = ({ onClick }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);

  return (
    <Div onClick={onClick}>
      <Typography color="primary" style={{ color: colors.blue, fontSize: 24 }}>
        + Create new
      </Typography>
    </Div>
  );
};