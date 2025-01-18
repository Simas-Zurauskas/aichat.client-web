import { useStateSelector } from '@/state';
import useActionsTheme from '@/state/actionHooks/useActionsTheme';
import styled from '@emotion/styled';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Div = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  height: 100%;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;

  .dis {
    margin-top: auto;
  }

  p {
    cursor: pointer;
    &:hover {
      /* color: ${({ theme }) => theme.colors.primary}; */
      text-decoration: underline;
      font-weight: 500;
    }
  }
`;

interface AsideProps {}

const Aside: React.FC<AsideProps> = () => {
  const scheme = useStateSelector(({ theme }) => theme.scheme);
  const { setScheme } = useActionsTheme();
  const router = useRouter();

  return (
    <Div>
      <Typography>Logo</Typography>
      <Box mb={2} />
      <Typography onClick={() => router.push('/')}>Instances</Typography>
      <Typography onClick={() => router.push('/account')}>Account</Typography>
      <div className="dis"></div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={scheme === 'dark'} onChange={() => setScheme(scheme === 'dark' ? 'light' : 'dark')} />
          }
          label="Dark Mode"
        />
      </FormGroup>
      <Typography>2025 @Mega corp</Typography>
    </Div>
  );
};

export default Aside;
