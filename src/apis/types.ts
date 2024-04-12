import { DragonProposalSortField, DragonProposalState, TradeType } from '@/constants/enum';
import { PayTokenEnum } from '@/constants/hatch';
import { SiweMessage } from 'siwe';
import { Address } from 'viem';

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

export type LoginRes = {
  address: Address;
  accessToken: string;
};

export type FetchListParams = {
  page?: number;
  size?: number;
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

export type BuffNumberDataItem = { min: number; max: number | null; buff: number };

export type BoundAddress = {
  buffAddress: string;
  buffAAAddress: string;
};

export type BindAddressParams = {
  signature: string;
  publicKey?: string;
  buffAddress: string;
};

export type UserInfo = {
  btcAddress: string;
  evmAddress: string;
  showName: string;
};

export type BRC420Item = {
  total: number;
  list: {
    inscription_id: string;
    content_id: string;
    deploy_inscription_id: string;
    content_type: string;
  }[];
};

export type AllRewardData = {
  evmAddress: string;
  showName: string;
  mdbl: string;
  blueBox: number;
  thisSong: number;
  mBtc: string;
  moDragonEpic: number;
  moDragonRare: number;
  moDragonUncommon: number;
  couponFreeHistory: number;
  couponEightHistory: number;
};
export type CouponResult = {
  couponTwoCurrent: number;
  couponEightCurrent: number;
  couponFreeCurrent: number;
};

export type HatchDryRunBody = {
  quantity: number;
  couponTwoCount: number;
  couponEightCount: number;
  couponFreeCount: number;
  payToken: PayTokenEnum;
};

export type HatchDryRunResult = {
  evmAddress: string;
  bizId: string;
  payDollar: number;
  payTokenType: string;
  payTokenAmount: string;
  hatchQuantity: number;
};

export type HatchRewardResult = {
  evmAddress: string;
  showName: any;
};

export type MintRewardResult = {
  mdbl: string;
  blueBox: number;
  thisSong: number;
  mBtc: string;
  moDragonEpic: number;
  moDragonRare: number;
  moDragonUncommon: number;
  couponFree: number;
  couponEight: number;
};

export type FetchTradeHistoryParams = {
  page?: number;
  size?: number;
  evmAddress?: string; // my/all
};
export type TradeHistoryListItem = {
  price: string;
  evmAddress: string;
  txHash: string;
  shares: string;
  assets: string;
  tradeType: TradeType;
  blockNumber: number;
  blockTimestamp: number;
};
export type TradeHistoryListItemData = {
  totalCount: number;
  tradeList: TradeHistoryListItem[];
};

export type PriceHistory = {
  sharePrice: string;
  blockNumber: number;
  blockTimestamp: number;
  createdAt: string;
};

export type BuffAddress = {
  evmAddress: Address;
  buffAddress: string;
  buffAAAddress: Address;
};

export type DragonBallCount = {
  btcDragonBallCount: number;
  mDragonBallCount: number;
};

export type SnapShotData = {
  airdropMdblBalance: string;
  blockNumber: number;
  btcDragonBallCount: number;
  buffAAAddress: string;
  buffAddress: string;
  dragonBallTotalCount: number;
  evmAddress: string;
  mDragonBallCount: number;
  mdblBalance: string;
  rewardByBalance: string;
  rewardByBall: string;
};
