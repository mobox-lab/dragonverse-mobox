import request, { Response } from '@/apis/request';
import { DragonProposalSortField } from '@/constants/enum';
import { Address } from 'viem';
import {
  AllRewardData,
  BRC420Item,
  BindAddressParams,
  BtcLoginParams,
  BuffAddress,
  DailyReward,
  DragonBallCount,
  DragonGameRank,
  DragonGovernInfo,
  DragonProposal,
  EvmLoginParams,
  FetchDragonProposalParams,
  FetchTradeHistoryParams,
  LoginRes,
  PriceHistory,
  SnapShotData,
  StakeBuff,
  StakeHistoryListItemData,
  StakeRewardSignature,
  TradeHistoryListItemData,
  AirdropProof,
} from './types';

export const fetchDragonGovernInfo = () => request.get<any, Response<DragonGovernInfo>>('/modragonGovern/basicInfo');

export const fetchNumberOfDragonProposals = (address?: Address) =>
  request.get<any, Response<number>>('/modragonGovern/numberOfProposals', { params: { userAddress: address } });

export const fetchDragonGameRank = ({ page = 1, size = 25 }: FetchDragonProposalParams) =>
  request.get<any, Response<DragonGameRank[]>>('/modragon/mo-rank/list', {
    params: { page, size },
  });

export const fetchDragonProposals = ({
  sortField = DragonProposalSortField.ALL,
  page = 1,
  size = 16,
}: FetchDragonProposalParams) =>
  request.get<any, Response<DragonProposal[]>>('/modragonGovern/proposals', {
    params: { sortField, first: size, skip: size * (page - 1) },
  });

export const fetchEvmLogin = (data: EvmLoginParams) => request.post<any, Response<LoginRes>>('/merlin/login/evm', data);
export const fetchBtcLogin = (data: BtcLoginParams) => request.post<any, Response<LoginRes>>('/merlin/login/btc', data);

export const fetchBindAddress = (data: BindAddressParams) =>
  request.post<any, Response<any>>('/merlin/buff/bind/address', data);

export const fetchBRC420Balance = (data: { wallet_address?: string; deploy_inscription_id?: string }) =>
  request.post<any, Response<BRC420Item>>('https://api-1.brc420.io/api/v1/brc420/inscription/list', {
    ...data,
    page: 1,
    limit: 9999,
  });

export const fetchMyAllRewards = () => request.get<any, Response<AllRewardData>>('/merlin/hatch/my/reward');

export const fetchTradeHistoryList = ({ page = 1, size = 20, evmAddress }: FetchTradeHistoryParams) =>
  request.get<any, Response<TradeHistoryListItemData>>('/merlin/launch/trade/history', {
    params: {
      page,
      size,
      evmAddress,
    },
  });

export const fetchPriceHistoryList = () => request.get<any, Response<PriceHistory[]>>('/merlin/launch/price/history');

export const fetchTotalVolume = () =>
  request.get<
    any,
    Response<{
      volume: string;
      assetsReserveEnd: string;
      sharesReserveEnd: string;
    }>
  >('/merlin/launch/pool');

export const fetchMDBLShares = (address?: string) =>
  request.get<any, Response<{ myShare: string }>>('/merlin/launch/my/shares', { params: { address } });

export const fetchNetworkStatus = () => request.get<any, Response<{ rpcStatus: boolean }>>('/merlin/network/status');

export const fetchBuffAddress = (address?: string) =>
  request.get<any, Response<BuffAddress>>('/merlin/buff/buff-address', { params: { evmAddress: address } });
export const fetchEvmAddress = (address?: string) =>
  request.get<any, Response<{ address: string }>>('/merlin/buff/evm-address', { params: { buffAddress: address } });

export const fetchUnbindAddress = () => request.post<any, Response<boolean>>('/merlin/buff/unbind');

export const fetchBelongingDragonBall = () => request.get<any, Response<DragonBallCount>>('/merlin/belonging/dragonball');

export const fetchStakePendingHistoryList = ({ page = 1, size = 5 }: FetchTradeHistoryParams) =>
  request.get<any, Response<StakeHistoryListItemData>>('/merlin/stake/pending', {
    params: {
      page,
      size,
    },
  });

export const fetchStakeHistoryList = ({ page = 1, size = 5, order }: FetchTradeHistoryParams) =>
  request.get<any, Response<StakeHistoryListItemData>>('/merlin/stake/history', {
    params: {
      page,
      size,
      order,
    },
  });

export const fetchStakePendingCount = () => request.get<any, Response<number>>('/merlin/stake/pending-count');

export const fetchAirdropSnap = () => request.get<any, Response<SnapShotData>>('/merlin/airdrop/snap');

export const fetchStakeBuff = (address?: string) =>
  request.get<any, Response<StakeBuff>>('/merlin/stake/buff', { params: { address } });

export const fetchTotalReward = (address?: string) =>
  request.get<
    any,
    Response<{
      rewardBalance: string;
    }>
  >('/merlin/stake/reward-balance', { params: { evmAddress: address } });

export const fetchStakeReward = () => request.post<any, Response<{ id: string }>>('/merlin/stake/claim/reward');
export const fetchStakeRewardSig = (id?: string) =>
  request.get<any, Response<StakeRewardSignature>>('/merlin/stake/claim/reward/signature', { params: { id } });

export const fetchAirdropProof = (address?: string) =>
  request.get<any, Response<AirdropProof>>('/merlin/airdrop/proof', { params: { address } });

export const fetchDailyReward = () => request.get<any, Response<DailyReward>>('/merlin/stake/daily-reward');
