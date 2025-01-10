export const GAME_ASSETS_ID = {
  // 
  CaptureBall: 10001,
  // 
  DragonEgg: 10002,
  // 
  StaminaPotion: 10003,
  //  
  SweepToken: 10004,
} as const;

export type GameAssetID = (typeof GAME_ASSETS_ID)[keyof typeof GAME_ASSETS_ID];

//  
export type GameAssetAction = 101 | 102 | 10001;

export const GAME_ASSET_ACTION_TEXT: Record<GameAssetAction, string> = {
  101: 'Claim',
  102: 'Buy',
  10001: 'Use',
} as const;

//  
export const ADDITIONAL_ACTIONS = [101, 102];

//  
export const GAME_ASSET_ICONS = {
  [GAME_ASSETS_ID.StaminaPotion]: '/img/senzu-bean.png',
  [GAME_ASSETS_ID.CaptureBall]: '/img/capture-ball.png',
  [GAME_ASSETS_ID.DragonEgg]: '/img/hatch-egg-min.png',
  [GAME_ASSETS_ID.SweepToken]: '/img/sweep-token.png',
} as const;

//  
export const ASSET_USE_GAME: Record<number, string> = {
  0: '-',
  1: 'Dream Pet',
  2: 'Infinite Rumble',
} as const;

//  
export const GAME_ICONS: Record<number, string> = {
  1: '/img/game-pet-simulate-icon.png',
  2: '/img/game-infinite-ramble-icon.png',
};
