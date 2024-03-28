'use client';

import { useSetAtom } from 'jotai';
import instance from '@/apis/request';
import { useDisconnect } from 'wagmi';
import { useMutation } from '@tanstack/react-query';
import { fetchBtcLogin, fetchEvmLogin } from '@/apis';
import { BtcLoginParams, EvmLoginParams } from '@/apis/types';
import { accessTokenAtom, mainWalletConnectDialogAtom } from '@/atoms';

export const useMutationEvmLogin = () => {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);
  const setDialogOpen = useSetAtom(mainWalletConnectDialogAtom);
  const { disconnect } = useDisconnect();

  const handleError = () => {
    setAccessTokenAtom('');
    disconnect();
  };

  return useMutation({
    mutationFn: (params: EvmLoginParams) => fetchEvmLogin(params),
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

export const useMutationBtcLogin = () => {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);
  const setDialogOpen = useSetAtom(mainWalletConnectDialogAtom);

  const handleError = () => {
    setAccessTokenAtom('');
  };

  return useMutation({
    mutationFn: (params: BtcLoginParams) => fetchBtcLogin(params),
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
