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
`;

interface AsideProps {}

const Aside: React.FC<AsideProps> = () => {
  const { scheme, colors } = useStateSelector(({ theme }) => theme);
  const { setScheme } = useActionsTheme();

  return (
    <Div>
      <Logo colorOverride={colors.textWhite} />
      <Box mb={4} />
      <RouteItem icon={<LogoSvg />} title="Nodes" path="/" pathRegex={[/^\/$/, /^\/node\/[a-zA-Z0-9-]+$/]} />
      <RouteItem icon={<MyAccSvg />} title="My Account" path="/account" pathRegex={[/^\/account$/]} />

      <div className="dis"></div>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={scheme === 'dark'} onChange={() => setScheme(scheme === 'dark' ? 'light' : 'dark')} />
          }
          label={<Typography sx={{ color: colors.textWhite, ml: 2 }}>Dark mode</Typography>}
        />
      </FormGroup>
      <Box mb={2} />
      <Typography style={{ color: colors.textWhite }}>2025 @Mega corp</Typography>
    </Div>
  );
};

export default Aside;
