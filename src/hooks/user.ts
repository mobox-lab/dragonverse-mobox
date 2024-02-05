'use client';

import { useSetAtom } from 'jotai';
import { fetchLogin } from '@/apis';
import instance from '@/apis/request';
import { useDisconnect } from 'wagmi';
import { LoginParams } from '@/apis/types';
import { useMutation } from '@tanstack/react-query';
import { accessTokenAtom, mainWalletConnectDialogAtom } from '@/atoms';

export const useMutationLogin = () => {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);
  const setDialogOpen = useSetAtom(mainWalletConnectDialogAtom);
  const { disconnect } = useDisconnect();

  const handleError = () => {
    setAccessTokenAtom('');
    disconnect();
  };

  return useMutation({
    mutationFn: (params: LoginParams) => fetchLogin(params),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        setAccessTokenAtom(data.accessToken);
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
        setDialogOpen(false);
        return;
      }
      handleError();
    },
    onError: () => handleError(),
  });
};
