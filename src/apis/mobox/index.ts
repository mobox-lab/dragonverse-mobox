import { NFT_MOBOX_API_PREFIX } from '@/constants/env';
import { Response } from '../request';
import { DepositAddress, MoGameFightRankItem, MoGamePetRankItem, MoGameRankData, WithdrawData } from '../types';
import { BoxWallet } from './mobox';
import request from './request';

export const fetchBoxWallet = () => request.post<any, Response<BoxWallet>>('/user/symbol/balance', { symbol: 'mbox' });

export const fetchDragonUserBag = (addr?: string) =>
  request.get<any, Response<any>>('https://nft-api.mobox.io/nft/dragon/user/bag', { params: { addr } });

export const fetchDepositAddress = () => request.get<any, Response<DepositAddress[]>>('/user/deposit/address');

export const withdrawMobox = (data: WithdrawData) => request.post<any, Response<any>>('/user/wallet/withdraw', data);

export const fetchLogs = ({ page = 1, limit = 20 }: { page?: number; limit?: number }) =>
  request.post<any, Response<any>>('/payment/logs', { symbol: 'cake', action: 0, limit, page });

export const getMoboxAccessToken = (token?: string) =>
  request.post<any, Response<{ token: string }>>('/oauth/p12', { ptoken: token });

export const fetchMoPetGameRank = ({ page = 1, round = 1 }: { page?: number; round?: number }) =>
  request.get<any, Response<MoGameRankData<MoGamePetRankItem>>>('/mo-rank/pet/leaderboard', {
    params: {
      round,
      page,
    },
    baseURL: NFT_MOBOX_API_PREFIX,
  });
export const fetchMoFightRank = ({ page = 1, round = 1 }: { page?: number; round?: number }) =>
  request.get<any, Response<MoGameRankData<MoGameFightRankItem>>>('/mo-rank/fight/leaderboard', {
    params: {
      round,
      page,
    },
    baseURL: NFT_MOBOX_API_PREFIX,
  });
