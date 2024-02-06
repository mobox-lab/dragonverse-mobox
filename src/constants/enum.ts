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

export enum MenuItem {
  DragonKey,
  DawnBringer,
  Governance,
  GameRank,
}
