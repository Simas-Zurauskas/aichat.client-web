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

const AuthPage = () => {
  const params = useSearchParams();
  const { setUser } = useActionsAuth();
  const router = useRouter();

  const handleSignIn = () => {
    window.open(generateGoogleOAuthUrl());
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
      {/* <GameOfLife /> */}
      <div className="waves">
        <Waves />
      </div>
      <a href={generateGoogleOAuthUrl()} target="_blank">
        <Button variant="outlined" onClick={() => {}}>
          <GoogleIcon fontSize="small" sx={{ mr: 1 }} />
          Continue with Google+
        </Button>
      </a>
      <div className="waves wawes--top">
        <Waves />
      </div>
    </Main>
  );
};

export default AuthPage;
