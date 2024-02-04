import axios, { AxiosRequestConfig } from 'axios';
import { disconnect } from '@wagmi/core';
import { QueryClient } from '@tanstack/query-core';
import { wagmiConfig } from '@/providers/wagmi-provider';
import { getAccessToken, removeAccessToken } from '@/utils/authorization';

export type Response<T> = {
  code: number;
  message: string;
  data: T;
};

export type PendingTask = {
  config: AxiosRequestConfig;
  resolve: Function;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PREFIX,
  timeout: 15_000,
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    config.headers.Authorization = token ? 'Bearer ' + token : '';
    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    const { data } = response ?? {};
    if (data?.code === 401 && data?.data?.[0] === 'TokenExpiredError') {
      removeAccessToken();
      setTimeout(() => disconnect?.(wagmiConfig), 300);
    }
    return Promise.reject(data);
  },
);

export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export default instance;
