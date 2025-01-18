'use client';
import styled from '@emotion/styled';
import { Waves } from './comps';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { generateGoogleOAuthUrl, removeToken, setToken } from '@/api/utils';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import useActionsAuth from '@/state/actionHooks/useActionsAuth';
import { authorise } from '@/api/routes/auth';
import { toast } from 'react-toastify';

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .waves {
    position: absolute;
    width: 100%;
    bottom: 0;

    &.wawes--top {
      top: 0;
      bottom: auto;
      transform: rotate(180deg);
    }
  }
`;

export function isInAppBrowser() {
  if (typeof navigator !== 'undefined') {
    // @ts-ignore
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    // Basic checks for some common in-app browsers:
    const inAppKeywords = ['FBAN', 'FBAV', 'Instagram', 'LinkedInApp', 'Twitter'];
    return inAppKeywords.some((k) => ua.includes(k));
  }
  return false;
}

const AuthPage = () => {
  const params = useSearchParams();
  const { setUser } = useActionsAuth();
  const router = useRouter();

  const handleSignIn = () => {
    window.location.href = generateGoogleOAuthUrl();
  };

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      setToken(token);
      authorise()
        .then((res) => {
          setUser(res);
          router.replace('/');
        })
        .catch(() => {
          removeToken();
          toast.error('Failed to sign in');
        });
    }
  }, []);

  return (
    <Main>
      <div className="waves">
        <Waves />
      </div>
      {isInAppBrowser() ? (
        <h4>Not suported</h4>
      ) : (
        <Button variant="outlined" onClick={handleSignIn}>
          <GoogleIcon fontSize="small" sx={{ mr: 1 }} />
          Continue with Google
        </Button>
      )}

      <div className="waves wawes--top">
        <Waves />
      </div>
    </Main>
  );
};

export default AuthPage;
