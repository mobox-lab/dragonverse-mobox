import { BoxWallet } from './mobox';
import { Response } from '../request';
import request from './request';
import { DepositAddress, WithdrawData } from '../types';

export const fetchBoxWallet = () => request.post<any, Response<BoxWallet>>('/user/symbol/balance', { symbol: 'mbox' });

export const fetchDragonUserBag = (addr?: string) =>
  request.get<any, Response<any>>('https://nft-api.mobox.io/nft/dragon/user/bag', { params: { addr } });

export const fetchDepositAddress = () => request.get<any, Response<DepositAddress[]>>('/user/deposit/address');

export const withdrawMobox = (data: WithdrawData) => request.post<any, Response<any>>('/user/wallet/withdraw', data);

export const fetchLogs = ({ page = 1, limit = 20 }: { page?: number; limit?: number }) =>
  request.post<any, Response<any>>('/payment/logs', { symbol: 'cake', action: 0, limit, page });

export const getMoboxAccessToken = (token?: string) =>
  request.post<any, Response<{ token: string }>>('/oauth/p12', { ptoken: token });
