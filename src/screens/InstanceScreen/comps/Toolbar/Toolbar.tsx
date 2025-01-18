import { numeralFormat } from '@/lib/misc';
import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Div = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const user = useStateSelector(({ auth }) => auth.user);

  return (
    <Div>
      <Typography>
        Vector operations: {numeralFormat(user?.usage.vectorOps)} / {numeralFormat(user?.usage.vectorOpsLimit)}
      </Typography>
    </Div>
  );
};
