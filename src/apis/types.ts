import { Address } from 'viem';
import { SiweMessage } from 'siwe';
import { DragonProposalSortField, DragonProposalState } from '@/constants/enum';

export type EvmLoginParams = {
  address: string;
  message: Partial<SiweMessage>;
  signature: string;
};

export type BtcLoginParams = {
  address: string;
  message: string;
  signature: string;
  publicKey: string;
};

export type UserInfo = {
  address: Address;
  accessToken: string;
};

export type CodeDetail = {
  code: string;
  status: number | null;
  usedAddress: Address | null;
};

export type GparkGameDetail = {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: number;
  images: GparkGameImage[];
  startupExtension: string;
  gameTags: number;
  resource: GparkGameResource;
  author: GparkGameAuthor;
  sns: GparkGameSNS;
  canPlay: number;
};

export type GparkGameImage = {
  url: string;
  width: number;
  height: number;
};

export type GparkGameResource = {
  url: string;
  resourceType: number;
  size: number;
  fingerprint: string;
  packageName: string;
  upgradeStrategy: number;
  upgradeInstallType: number;
  editorVersion: string;
  editorVersionEncode: number;
};

export type GparkGameAuthor = {
  id: string;
  name: string;
  avatar: string;
  introduction: string;
};

export type GparkGameSNS = {
  playerCount: number;
  likeCount: number;
};

export type DragonProposal = {
  choices: string[];
  discussion: string;
  end: number;
  id: string;
  start: number;
  state: DragonProposalState;
  title: string;
  votes: number;
  scores_total: number;
  author: string;
  isUnique?: number; // 1 is already execute
};

export type GparkGameRoomMember = {
  avatar: string;
  gender: number;
  nickname: string;
  openId: number;
};

export type GparkGameRoomItem = {
  activeTime: number;
  createTime: number;
  dsId: string;
  gameId: string;
  id: number;
  limitNumber: number;
  mgsRoomId: string;
  number: number;
  podId: string;
  roomId: string;
  status: number;
  version: string;
  members: GparkGameRoomMember[];
};

export type DragonGovernInfo = {
  activeProposal: number;
  closedProposal: number;
  voterLength: number;
  votesCount: number;
};

export type FetchDragonProposalParams = {
  sortField?: DragonProposalSortField;
  page?: number;
  size?: number;
};

export type DawnBringerStatus = {
  eligible: boolean;
  r?: `0x${string}`;
  vs?: `0x${string}`;
  deadline?: number;
};

export type DragonGameRank = {
  userAddress: string;
  achievedAt: string; // Date String
  gameNum: number; // game times
  p12AccountInfo?: {
    showName?: string;
  };
  rank: number;
  playCount: number;
  point: number;
  achievedAtTimestamp: number; // Timestamp
};

export type WithdrawData = {
  chain: 'bnb' | 'arb';
  symbol: string;
  amount: string;
  ts: number;
  sign: string;
};

export type DepositAddress = {
  chainType: 'eth' | 'bnb' | 'trx' | 'arb';
  address: Address | string;
};

// action, 701 deposit, 5001 withdraw
export type LogItem = {
  log_id: number;
  user_id: number;
  coin: string;
  amount: string;
  app_id: number;
  action: number;
  ts: number;
};
