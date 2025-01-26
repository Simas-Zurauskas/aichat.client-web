import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const Div = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red; */
  /* height: 100%; */
`;

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <Div>
      <CircularProgress />
    </Div>
  );
};
