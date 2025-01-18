import { makeLogout } from '@/api/utils';
import { useStateSelector } from '@/state';
import useActionsTheme from '@/state/actionHooks/useActionsTheme';
import styled from '@emotion/styled';
import { Button, Switch, Typography } from '@mui/material';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const Wrap = styled.nav`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  filter: drop-shadow(0px 4px 10px rgba(121, 136, 134, 0.1));
  border-bottom: 1px solid ${({ theme }) => theme.colors.card};
`;

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const scheme = useStateSelector(({ theme }) => theme.scheme);
  const { setScheme } = useActionsTheme();
  return (
    <Wrap>
      <div>
        <Typography>LOGO</Typography>
      </div>
      <div>
        <Switch checked={scheme === 'dark'} onChange={() => setScheme(scheme === 'dark' ? 'light' : 'dark')} />
        <Button variant="contained" onClick={makeLogout} size="small">
          <ExitToAppRoundedIcon />
        </Button>
      </div>
    </Wrap>
  );
};

export default Nav;
