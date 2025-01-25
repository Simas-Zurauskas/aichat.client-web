import { store } from '@/state';
import { AxiosHeaderValue } from 'axios';

const TOKEN_KEY = 'ts:auth';

export const setToken = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export const getAuthHeaders = async () => {
  const headers: { [x: string]: AxiosHeaderValue } = {};
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const makeLogout = () => {
  removeToken();
  store.dispatch({ type: 'auth/setUser', payload: null });
};

export const generateGoogleOAuthUrl = (state: 'signup' | 'signin') => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return url;
};
