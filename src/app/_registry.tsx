'use client';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as StateProvider } from 'react-redux';
import { store, useStateSelector } from '@/state';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { getToken, removeToken } from '@/api/utils';
import { authorise } from '@/api/routes/auth';
import useActionsAuth from '@/state/actionHooks/useActionsAuth';
import { usePathname, useRouter } from 'next/navigation';
import useActionsTheme from '@/state/actionHooks/useActionsTheme';
import { colorsApp } from '@/state/reducers/theme';
import { QKey } from '@/types';

interface Props {
  children: React.ReactNode;
}

export const Registry: React.FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <StateProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <StylesManager>
          <AuthManager>{children}</AuthManager>
        </StylesManager>
      </QueryClientProvider>
    </StateProvider>
  );
};

const StylesManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors, scheme } = useStateSelector(({ theme }) => theme);
  const { setScheme } = useActionsTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: colors.primary,
          },
          secondary: {
            main: colors.background,
          },
        },
        typography: {
          fontFamily: 'var(--font-montserrat)',
          allVariants: {
            color: colors.text,
          },
        },
      }),
    [colors],
  );

  useEffect(() => {
    const scheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setScheme(scheme);
  }, []);

  return (
    <MUIThemeProvider theme={theme}>
      <EmotionThemeProvider theme={{ ...theme, colors, scheme }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ToastContainer hideProgressBar autoClose={4000} theme="colored" pauseOnHover position="bottom-left" />
          <CssBaseline />
          {children}
        </AppRouterCacheProvider>
      </EmotionThemeProvider>
    </MUIThemeProvider>
  );
};

const AuthManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isSignedIn = useStateSelector(({ auth }) => !!auth.user);
  const [authStatus, setAuthStatus] = useState<'uninitialized' | 'authorizing' | 'authorized'>('uninitialized');
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useActionsAuth();
  const [token, setToken] = useState<string | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: [QKey.user],
    queryFn: authorise,
    enabled: !!token,
  });

  useLayoutEffect(() => {
    const token = getToken();
    if (!token) {
      setAuthStatus('authorized');
    }
    setToken(token);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setAuthStatus('authorizing');
    } else {
      if (data) {
        setUser(data);
      }
      if (error) {
        removeToken();
      }
      setAuthStatus('authorized');
    }
  }, [data, error, isLoading]);

  useLayoutEffect(() => {
    const globalPaths = [/^\/terms-and-conditions$/, /^\/privacy-policy$/];
    const signedInPaths = [/^\/$/, /^\/account$/, /^\/instance\/[a-zA-Z0-9-]+$/];

    const isPathMatch = (pathArray: RegExp[], pathname: string) => pathArray.some((el) => el.test(pathname));

    if (authStatus === 'authorized' && !isPathMatch(globalPaths, pathname)) {
      if (isSignedIn) {
        if (isPathMatch(signedInPaths, pathname)) {
          return;
        }
        router.replace('/');
      } else {
        router.replace('/auth');
      }
    }
  }, [isSignedIn, authStatus, pathname]);

  // useLayoutEffect(() => {
  //   const globalPaths = ['/terms-and-conditions', '/privacy-policy'];
  //   const signedInPaths = ['/', '/account'];

  //   if (authStatus === 'authorized' && !globalPaths.includes(pathname)) {
  //     if (isSignedIn) {
  //       if (signedInPaths.includes(pathname)) return;
  //       router.replace('/');
  //     } else {
  //       router.replace('/auth');
  //     }
  //   }
  // }, [isSignedIn, authStatus, pathname]);

  if (authStatus === 'uninitialized') return null;
  if (authStatus === 'authorizing') return 'Authorizing...';
  return <>{children}</>;
};
