import { createStore } from 'jotai/vanilla';

const jotaiStore = createStore();

export * from '@/atoms/wallet';

export { jotaiStore };
