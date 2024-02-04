import { arbitrum, arbitrumGoerli, bsc, bscTestnet } from 'viem/chains';

// Particle Network config
export const PARTICLE_PROJECT_ID = process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID ?? '';
export const PARTICLE_CLIENT_KEY = process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY ?? '';
export const PARTICLE_APP_ID = process.env.NEXT_PUBLIC_PARTICLE_APP_ID ?? '';

export const ALLOW_CHAINS = process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? [bsc, arbitrum] : [bscTestnet, arbitrumGoerli];

export const CDN_URL = 'https://cdn-dragonverseneo.mobox.app';

export const DAWN_BRINGERS_ADDRESS =
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production'
    ? '0xE4B817BDE12E942D3d662fA7E7e5CF0F4694BEE8'
    : '0xCa3b7d7b0a3dcFD9df318E1be4503f7054eA9528';

export const MOBOX_TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production'
    ? '0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377'
    : '0x01FD87cB74265a0a9Af6a62afB2FEf8C9646f515';

export const MOBOX_GOVERN_FORGE_ADDRESS =
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production'
    ? '0x07c8f54895d5aaadd7737d1Cb31D53D56B0f5B7a'
    : '0x2c543da657df10B92006Cc77E8F308608eF86f93';

export const inputRegex = /^\d*(?:\\[.])?\d*$/;

export const MOBOX_BSC_ADDRESS = '0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377';
export const MOBOX_ARB_ADDRESS = '0xdA661fa59320B808c5a6d23579fCfEdf1FD3cf36';
