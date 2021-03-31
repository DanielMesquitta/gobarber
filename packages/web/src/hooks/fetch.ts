import useSWR from 'swr';

import { api } from '~/services';
import { getCookie } from '~/utils';

const handler = async (params: string) => {
  const { data } = await api.get(params);
  if (data) return data;
  throw new Error('Unauthorized!');
};

const useFetch = <T>(
  url: string
): {
  data: T;
  token: string;
  error: Error;
  mutate: (data?: T, shouldRevalidate?: boolean) => Promise<T>;
  loading: boolean;
} => {
  let token;
  try {
    token = JSON.parse(getCookie('auth')).token;
  } catch {
    token = null;
  }
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  const { data, mutate, error } = useSWR<T>(url, handler, {
    revalidateOnFocus: false,
    errorRetryInterval: 10000,
  });
  const loading = !data && !error;
  return {
    data,
    token,
    error,
    mutate,
    loading,
  };
};

export default useFetch;
