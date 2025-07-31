import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken } from '@/utils/authorization';

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
    return Promise.reject(data);
  },
);

export default instance;
// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function: refactor: 🔧 improve code readability
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const refactor____improve_code_readability: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
