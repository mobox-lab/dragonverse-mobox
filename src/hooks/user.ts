'use client';
import { fetchLogin } from '@/apis';
import instance from '@/apis/request';
import { LoginParams } from '@/apis/types';
import { accessTokenAtom } from '@/atoms/user/state';
import { setAccessToken } from '@/utils/authorization';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { useDisconnect } from 'wagmi';

export const useMutationLogin = () => {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);

  return useMutation({
    mutationFn: (params: LoginParams) => fetchLogin(params),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        setAccessToken(data.accessToken);
        setAccessTokenAtom(data.accessToken);
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
      }
    },
  });
};

export const useLogoutCallback = () => {
  const { disconnect } = useDisconnect();

  return useCallback(() => {
    disconnect?.();
  }, [disconnect]);
};
