import request, { Response } from '@/apis/request';
import { DragonProposalSortField } from '@/constants/enum';
import { Address } from 'viem';
import {
  AirdropProof,
  AllRewardData,
  BRC420Item,
  BindAddressParams,
  BtcLoginParams,
  BuffAddress,
  BuffData,
  DailyReward,
  DragonBallBurnRank,
  DragonBallCount,
  DragonGameRank,
  DragonGovernInfo,
  DragonProposal,
  EvmLoginParams,
  FetchDragonProposalParams,
  FetchGameRankParams,
  FetchTradeHistoryParams,
  FightRankRes,
  GameAsset,
  GameRound,
  LoginRes,
  ObtainData,
  PetRankRes,
  PriceHistory,
  RankCurrentRound,
  SnapShotData,
  StakeBuff,
  StakeHistoryListItemData,
  StakeRewardSignature,
  TradeHistoryListItemData,
  StakeRewardHistory,
  RankRewardBalance,
  PGEGameId,
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

export const fetchInactiveEMDBL = (address?: string) =>
  request.get<any, Response<{ inactiveEmdblAmount: string }>>('/merlin/stake/inactive-emdbl', { params: { address } });

export const fetchRankCurrentRound = (gameId?: string) =>
  request.get<any, Response<RankCurrentRound>>('/pge-game/rank/round/current', { params: { gameId } });

export const fetchBuffData = (gameId?: string) =>
  request.get<any, Response<BuffData>>('/pge-game/dragon-verse-pal/get-pal-buff', { params: { gameId } });

export const fetchObtain = (gameId?: string) =>
  request.get<any, Response<ObtainData>>('/pge-game/stamina/obtain-web', { params: { gameId } });

export const fetchGameAsset = (gameId?: string) =>
  request.get<any, Response<GameAsset>>('/pge-game/dragon-verse-assets/get-user-asset', { params: { gameId } });

export const claimGameAsset = (type: 'DragonEgg' | 'CaptureBall', gameId?: string) =>
  request.post<any, Response<boolean>>('/pge-game/dragon-verse-assets/claim-use-asset', { assetName: type, gameId });

export const fetchGameRoundList = (gameId?: string) =>
  request.get<
    any,
    Response<{
      list: GameRound[];
    }>
  >('/pge-game/rank/round/list', { params: { gameId } });

export const fetchPetRank = ({ page = 1, size = 20, round, address, gameId }: FetchGameRankParams) =>
  request.get<any, Response<PetRankRes>>('/pge-game/rank/pet/list', {
    params: {
      page,
      size,
      round,
      address,
      gameId,
    },
  });

export const fetchFightRank = ({ page = 1, size = 20, round, address, gameId }: FetchGameRankParams) =>
  request.get<any, Response<FightRankRes>>('/pge-game/rank/fight/list', {
    params: {
      page,
      size,
      round,
      address,
      gameId,
    },
  });

export const fetchBurnRank = () => request.get<any, Response<DragonBallBurnRank[]>>('/merlin/burn/dragonball-rank');

export const fetchStakeRewardHistory = ({ page = 1, size = 5 }) =>
  request.get<any, Response<StakeRewardHistory>>('/merlin/stake/reward-history', {
    params: {
      page,
      size,
    },
  });

export const fetchRankRewardBalance = ({ address }: { address?: string }) =>
  request.get<any, Response<RankRewardBalance>>('/pge-game/rank/reward-balance', { params: { evmAddress: address } });

export const fetchRankRewardClaim = () => request.post('/pge-game/rank/claim/reward');

export const fetchClaimRewardSignature = ({ id }: { id?: number }) =>
  request.get('/pge-game/rank/claim/reward/signature', { params: { id } });

export const fetchRankMdblProof = (address?: string) =>
  request.get<any, Response<AirdropProof>>('/pge-game/rank/mdbl-proof', { params: { evmAddress: address } });

export const fetchPgeGameId = () => request.get<any, Response<PGEGameId>>('/pge-game/game-id');

export const fetchRankMoboxProof = (address?: string) =>
  request.get<any, Response<AirdropProof>>('/pge-game/rank/mbox-proof', { params: { evmAddress: address } });

export const fetchTotalActiveEmdbl = () => request.get('/merlin/stake/total-active-emdbl');
