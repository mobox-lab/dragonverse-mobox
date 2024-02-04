import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { getAccount } from '@wagmi/core';
import { STORAGE_KEY } from '@/constants/storage';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { accessTokensAtom } from '@/atoms';
import { wagmiConfig } from '@/providers/wagmi-provider';
import { Address } from 'viem';

export type Authorization = {
  address: string;
  accessToken: string;
};

export function useAccessToken({ address }: { address?: Address }) {
  const accessTokens = useAtomValue(accessTokensAtom);
  return useMemo(() => (address ? accessTokens[address] : null), [accessTokens, address]);
}

/**
 * 获取 accessToken
 */
export function getAccessToken({ address: passedAddress }: { address?: Address } = {}) {
  const { address } = getAccount(wagmiConfig);
  const accessTokens = getLocalStorage<Authorization[]>(STORAGE_KEY.ACCESS_TOKENS);
  const item = accessTokens?.find((i) => i.address === (passedAddress ?? address));
  return item?.accessToken;
}

/**
 * 设置 accessToken 缓存, 最多10个账户
 * @param accessToken
 */
export function setAccessToken(accessToken: string) {
  const { address } = getAccount(wagmiConfig);
  const accessTokens = getLocalStorage<Authorization[]>(STORAGE_KEY.ACCESS_TOKENS);
  if (!address) return;
  const data: Authorization = { address, accessToken };
  if (!accessTokens?.length) {
    setLocalStorage(STORAGE_KEY.ACCESS_TOKENS, [data]);
    return;
  }
  const index = accessTokens.findIndex((item) => item.address === address);
  if (index !== -1) {
    accessTokens[index].accessToken = accessToken;
  } else {
    accessTokens.push({ address, accessToken });
    if (accessTokens.length > 10) {
      accessTokens.shift();
    }
  }
  setLocalStorage(STORAGE_KEY.ACCESS_TOKENS, accessTokens);
}

/**
 * 移除 accessToken
 */
export function removeAccessToken() {
  const { address } = getAccount(wagmiConfig);
  const accessTokens = getLocalStorage<Authorization[]>(STORAGE_KEY.ACCESS_TOKENS);
  if (!address) {
    setLocalStorage(STORAGE_KEY.ACCESS_TOKENS, []);
    return;
  }
  const list = accessTokens?.filter((item) => item.address !== address);
  setLocalStorage(STORAGE_KEY.ACCESS_TOKENS, list ?? []);
}
