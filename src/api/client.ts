import axios from 'axios';
import { getAuthHeaders, makeLogout } from './utils';

// ----------------------------------------------------------
export const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_PATH}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(async (request) => {
  const authHeaders = await getAuthHeaders();

  if (request.headers) {
    Object.entries(authHeaders).forEach(([key, value]) => {
      request.headers.set(key, value);
    });
  }

  return request;
});

client.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        makeLogout();
      }
    }

    return Promise.reject(err.response?.data as { message: string });
  },
);
