'use client';
import styled from '@emotion/styled';
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { generateGoogleOAuthUrl, removeToken, setToken } from '@/api/utils';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import useActionsAuth from '@/state/actionHooks/useActionsAuth';
import { authorise } from '@/api/routes/auth';
import { toast } from 'react-toastify';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/form';
import Link from 'next/link';
import { Visual } from './comps';
import { useStateSelector } from '@/state';
import { SlideA } from './comps/comps/slides';
import RevealFx from '@/components/RevealFX';

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(180deg, #2b4a76 0%, #1f2937 100%);
  overflow: hidden;
  max-width: 100%;
  height: 100%;
  flex: 1;
  max-width: 100vw;
  overflow: hidden;

  .MuiContainer-root {
    display: grid;
    grid-template-columns: 1fr 1.8fr;
    margin-top: 44px;
    max-width: 100%;
    flex: 1;
  }

  .form {
    position: relative;
    background-color: ${({ theme }) => theme.colors.appBgFront};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    padding-bottom: 20%;
    user-select: none;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    &__logo {
      margin-top: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      grid-gap: 24px;
      &__scaled {
        transform: scale(1.5);
      }
    }

    &__link {
      cursor: pointer;
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.blue};
      font-weight: 500;
    }

    &__main {
      max-width: 400px;
      width: 100%;
      .MuiFormControlLabel-root {
      }
      .MuiFormControlLabel-label {
        padding-bottom: 1px;
        font-size: 14px;
        p {
          transform: translateY(10px) !important;
        }
      }
      .MuiCheckbox-root {
        padding: 4px;

        .MuiSvgIcon-root {
          fill: ${({ theme }) => theme.colors.secondary};
        }
      }
    }

    &__button {
      height: 48px;
    }

    &__loading {
      position: absolute;
      bottom: 0;
      top: 0;
      flex: 1;
      display: flex;
      align-items: center;
    }

    &__bottom {
      position: absolute;
      bottom: 10px;
      left: 20px;
      width: 100%;
      * {
        user-select: text;
        color: ${({ theme }) => (theme.scheme === 'light' ? '#4e6c8fd3' : '#809dbedf')} !important;
      }
    }
  }

  .visual {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 0 50px 0 100px;
    /* border: 1px solid red; */
  }

  .unsupported {
    max-width: 400px;
    * {
      text-align: center;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .MuiContainer-root {
      display: flex;
      flex-direction: column;
      margin-top: 0px;
    }
    .form {
      flex: 1;
      top: 0;
      border-radius: 0;

      &__logo {
        &__scaled {
          transform: scale(1.2);
        }
      }
    }
  }
`;

export function isInAppBrowser() {
  if (typeof navigator !== 'undefined') {
    // @ts-ignore
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const inAppKeywords = ['FBAN', 'FBAV', 'Instagram', 'LinkedInApp', 'Twitter'];
    return inAppKeywords.some((k) => ua.includes(k));
  }
  return false;
}

const AuthPage = () => {
  const params = useSearchParams();
  const colors = useStateSelector(({ theme }) => theme.colors);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreement, setAgreement] = useState({ tscs: false, privacy: false });
  const { setUser } = useActionsAuth();
  const router = useRouter();
  const isLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleSignIn = () => {
    window.location.href = generateGoogleOAuthUrl(isSignUp ? 'signup' : 'signin');
  };

  useLayoutEffect(() => {
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      setToken(token);
      setIsLoading(true);
      authorise()
        .then((res) => {
          setUser(res);
          router.replace('/');
        })
        .catch(() => {
          removeToken();
          toast.error('Something went wrong');
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    } else {
      if (error) {
        toast.error(error);
      }
    }
  }, []);

  return (
    <Main>
      <Container style={{ maxWidth: 1920, padding: `0 0 0 ${isMd ? 0 : isLg ? 20 : 80}px` }}>
        <div className="form">
          {!isLoading ? (
            <>
              <div className="form__logo">
                <Logo className="form__logo__scaled" />
                <Typography textAlign={'center'}>Your Personal AI Workspace for Smarter Conversations</Typography>
              </div>

              {!isInAppBrowser() ? (
                <div className="form__content">
                  <Typography variant="h2" fontWeight={600}>
                    Sign {isSignUp ? 'Up' : 'In'}
                  </Typography>
                  <Box sx={{ mt: isMd ? 1 : 2 }} />
                  {isSignUp ? (
                    <Typography variant="body2">
                      Already have an account? Sign in{' '}
                      <span
                        className="form__link"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setAgreement({ tscs: false, privacy: false });
                        }}
                      >
                        here.
                      </span>
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      Don’t have an account? Register{' '}
                      <span
                        className="form__link"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setAgreement({ tscs: false, privacy: false });
                        }}
                      >
                        here.
                      </span>{' '}
                      It’s free.
                    </Typography>
                  )}
                  <Box sx={{ mt: 5 }} />
                  <div className="form__main">
                    {isSignUp && (
                      <>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={agreement.privacy}
                                onChange={(e) => setAgreement({ ...agreement, privacy: e.target.checked })}
                              />
                            }
                            label={
                              <span>
                                I agree to the{' '}
                                <Link href={'/privacy-policy'} target="_blank" className="form__link">
                                  Privacy Policy
                                </Link>
                              </span>
                            }
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={agreement.tscs}
                                onChange={(e) => setAgreement({ ...agreement, tscs: e.target.checked })}
                              />
                            }
                            label={
                              <span>
                                I have read and accept the{' '}
                                <Link href={'/terms-of-service'} target="_blank" className="form__link">
                                  Terms of service
                                </Link>
                              </span>
                            }
                          />
                        </FormGroup>
                        <Box sx={{ mt: 2 }} />
                      </>
                    )}
                    <Button
                      variant="contained"
                      className="form__button"
                      fullWidth
                      onClick={handleSignIn}
                      disabled={isSignUp ? !agreement.privacy || !agreement.tscs : false}
                    >
                      <GoogleIcon fontSize="small" sx={{ marginRight: 1.5 }} />
                      Sign {isSignUp ? 'up' : 'in'} with Google
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="form__content">
                  <div className="unsupported">
                    <Typography variant="h6">Unsupported Browser</Typography>
                    <Box sx={{ mt: 1 }} />
                    <Typography variant="body2">
                      It looks like you're using an in-app browser, which doesn’t support Google login. Please open this
                      page in Safari or Chrome to continue.
                    </Typography>
                  </div>
                </div>
              )}
              <div className="form__bottom">
                <Typography variant="body2">{new Date().getFullYear()} Simas Žurauskas. </Typography>
                <Typography variant="body2">
                  <a href="mailto:simaszurauskas@gmail.com" target="_blank">
                    simaszurauskas@gmail.com
                  </a>
                </Typography>
              </div>
            </>
          ) : (
            <div className="form__loading">
              <CircularProgress />
            </div>
          )}
        </div>

        {!isMd && (
          <div className="visual">
            <Typography variant="h2" style={{ color: colors.textWhite }} textAlign={'center'}>
              Train AI on Your Files
            </Typography>
            <Box mb={4} />
            <SlideA isActive />
          </div>
        )}
      </Container>
    </Main>
  );
};

export default AuthPage;
