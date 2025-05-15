'use client';

import { useSetAtom } from 'jotai';
import instance from '@/apis/request';
import { useAccount, useDisconnect } from 'wagmi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchBalance, fetchBtcLogin, fetchEvmLogin, fetchIsWhitelist, fetchRechargeAddress, fetchUserInfo, fetchWithdraw } from '@/apis';
import { BtcLoginParams, EvmLoginParams, FetchWithdraw, UserGameInfo } from '@/apis/types';
import { accessTokenAtom, mainWalletConnectDialogAtom } from '@/atoms';
import { balancesAtom, rechargeAddressAtom } from '@/atoms/assets';
import { userGameInfoAtom } from '@/atoms/user';
import { useEffect } from 'react';
import { useIsMainConnected } from './wallet';

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

export const useQueryBalance = () => {
  const setBalances = useSetAtom(balancesAtom);
  const { address } = useAccount();
  const isMainConnected = useIsMainConnected();

  const { data, refetch } = useQuery({
    queryKey: ['balance', address],
    queryFn() {
      return fetchBalance();
    },
    select(result) {
      return result.code === 200 ? result.data : null;
    },
    enabled: isMainConnected,
  });

  useEffect(() => {
    if (!!data) {
      setBalances({
        [data.symbol]: data.balance,
      });
    }
  }, [data]);

  return refetch;
};

export const useQueryRechargeAddress = () => {
  const setRechargeAddress = useSetAtom(rechargeAddressAtom);
  const isMainConnected = useIsMainConnected();
  const { address } = useAccount();

  const { data, refetch } = useQuery({
    queryKey: ['address', address],
    queryFn() {
      return fetchRechargeAddress();
    },
    select(result) {
      return result.code === 200 ? result.data : null;
    },
    enabled: isMainConnected,
  });

  useEffect(() => {
    if (!!data) {
      setRechargeAddress({
        merlin: data.hdWalletAddress,
      });
    }
  }, [data]);

  return refetch;
};

export const useQueryUserGameInfo = () => {
  const setGameInfo = useSetAtom(userGameInfoAtom);
  const isMainConnected = useIsMainConnected();
  const { address } = useAccount();

  const { data, refetch } = useQuery({
    queryKey: ['game-info', address],
    queryFn() {
      return fetchUserInfo();
    },
    select(result) {
      return result.code === 200 ? result.data : null;
    },
    enabled: isMainConnected,
  });

  useEffect(() => {
    if (!!data) {
      setGameInfo({
        gparkUserAvatar: data.gparkUserAvatar || 'https://qn-basic-content.gpark.io/online/CN2EhgXtfJM71713324179693.png',
        gparkUserName: data.gparkUserName,
      });
    }
  }, [data]);

  return refetch;
};

export const useMutateWithdraw = () => {
  return useMutation({
    mutationFn(params: FetchWithdraw) {
      return fetchWithdraw(params);
    },
  });
};

export const useFetchIsWhitelist = () => {
  return useQuery({
    queryKey: ['whitelist'],
    queryFn() {
      return fetchIsWhitelist();
    }
  });
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
