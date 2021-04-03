import useSWR from 'swr';

import { api } from '~/services';

const handler = async (params: string) => {
  const { data } = await api.get(params);
  if (data) return data;
  throw new Error('Unauthorized!');
};

const useFetch = <T>(
  url: string
): {
  data: T;
  error: Error;
  mutate: (data?: T, shouldRevalidate?: boolean) => Promise<T>;
  loading: boolean;
} => {
  const { data, mutate, error } = useSWR<T>(url, handler, {
    revalidateOnFocus: false,
    errorRetryInterval: 10000,
  });
  const loading = !data && !error;
  return {
    data,
    error,
    mutate,
    loading,
  };
};

export default useFetch;
