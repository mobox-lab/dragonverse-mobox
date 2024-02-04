import { AxiosInstance } from 'axios';
import { PendingTask } from './request';

export async function retryRequest(queue: PendingTask[], instance: AxiosInstance) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      queue.forEach(({ config, resolve }) => setTimeout(() => resolve(instance(config)), Math.random() * 500));
      resolve(false);
    }, 500);
  });
}
