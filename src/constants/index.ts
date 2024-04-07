import { merlinMainnet, merlinTestnet } from '@/connectors/chains';

export const PARTICLE_APP_ID = process.env.NEXT_PUBLIC_PARTICLE_APP_ID ?? '';

export const ALLOW_CHAIN = process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? merlinMainnet.id : merlinTestnet.id;

export const CDN_URL = 'https://cdn-dragonverseneo.mobox.app';

export const MOBOX_TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production'
    ? '0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377'
    : '0x01FD87cB74265a0a9Af6a62afB2FEf8C9646f515';

export const MOBOX_GOVERN_FORGE_ADDRESS =
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production'
    ? '0x07c8f54895d5aaadd7737d1Cb31D53D56B0f5B7a'
    : '0x2c543da657df10B92006Cc77E8F308608eF86f93';

export const inputRegex = /^\d*(?:\\[.])?\d*$/;

export const SocialLinks = {
  twitter: 'https://twitter.com/DragonverseNeo',
  telegram: 'https://t.me/mobox_io',
  discord: 'https://discord.com/invite/gW2eAU4WZy',
};

export const ONE = 1000000000000000000n;
