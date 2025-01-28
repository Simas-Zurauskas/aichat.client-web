import { useStateSelector } from '@/state';
import useActionsTheme from '@/state/actionHooks/useActionsTheme';
import styled from '@emotion/styled';
import { Box, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { RouteItem } from './comps/RouteItem';
import { LogoSvg, MyAccSvg } from '@/components/dynamicSvg';
import { Logo } from '@/components/Logo';
import { Switch } from '@/components/form';

const Div = styled.div`
  background-color: ${({ theme }) => theme.colors.appBgBack};
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;

  .MuiFormControlLabel-root {
    user-select: none;
  }

  .dis {
    margin-top: auto;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 12px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 12px 6px;
    .dm-label {
      display: none;
    }
    .logo-wrap {
      margin-left: 2px;
    }
  }
`;

interface AsideProps {}

const Aside: React.FC<AsideProps> = () => {
  const { scheme, colors } = useStateSelector(({ theme }) => theme);
  const { setScheme } = useActionsTheme();

  return (
    <Div>
      <div className="logo-wrap">
        <Logo colorOverride={colors.textWhite} hideTextOnMobile />
      </div>
      <Box mb={4} />
      <RouteItem icon={<LogoSvg />} title="Nodes" path="/" pathRegex={[/^\/$/, /^\/node\/[a-zA-Z0-9-]+$/]} />
      <Box mb={0.2} />
      <RouteItem icon={<MyAccSvg />} title="My Account" path="/account" pathRegex={[/^\/account$/]} />

      <div className="dis"></div>

      <FormGroup style={{ padding: '0 12px' }}>
        <FormControlLabel
          control={
            <Switch checked={scheme === 'dark'} onChange={() => setScheme(scheme === 'dark' ? 'light' : 'dark')} />
          }
          label={
            <Typography sx={{ color: colors.textWhite, ml: 2 }} className="dm-label">
              Dark mode
            </Typography>
          }
        />
      </FormGroup>
    </Div>
  );
};

export default Aside;
