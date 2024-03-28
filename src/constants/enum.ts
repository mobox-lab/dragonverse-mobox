export enum MainWalletType {
  BTC = 'btc',
  EVM = 'evm',
}

export enum EditorLoginType {
  GPark = 'gpark',
  P12 = 'p12',
}

export enum DragonProposalState {
  ACTIVE = 'active',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export enum RoomStatus {
  CanJoin,
  Full,
  Closed,
}

export enum DragonProposalSortField {
  ALL = 'all',
  ACTIVE_PROPOSALS = 'active',
  EXECUTED_PROPOSALS = 'executed',
}

export enum DragonBallBurnTab {
  DRAGON_BALL = 'dragonBall',
  MO_DRAGON = 'MODragon',
}

export enum MenuItem {
  DragonKey,
  DawnBringer,
  Governance,
  GameRank,
}

export enum Rarity {
  Common,
  Uncommon,
  Rare,
  Epic,
  Legendary,
}

export const rarityStyles = {
  [Rarity.Common]: {
    color: '#797979',
    bg: 'bg-gradient-to-b from-white/[0.12] to-[#6b6b6b]/[0.12]',
    border: 'border border-[#797979]',
  },
  [Rarity.Uncommon]: {
    color: '#62AF85',
    bg: 'bg-gradient-to-b from-[#34ffaa]/[0.12] to-[#34ffaa]/[0.12]',
    border: 'border border-[#62AF85]',
  },
  [Rarity.Rare]: {
    color: '#62A1AF',
    bg: 'bg-gradient-to-b from-[#34f3ff]/[0.12] to-[#00748d]/[0.12]',
    border: 'border border-[#62A1AF]',
  },
  [Rarity.Epic]: {
    color: '#AF6290',
    bg: 'bg-gradient-to-b from-[#ff34ba]/[0.12] to-[#8d004c]/[0.12]',
    border: 'border border-[#AF6290]',
  },
  [Rarity.Legendary]: {
    color: '#CE9C54',
    bg: 'bg-gradient-to-b from-[#ffa800]/[0.12] to-[#865112]/[0.12]',
    border: 'border border-[#CE9C54]',
  },
};

export enum TradeType {
  BUY = 'Buy',
  SELL = 'Sell',
}
