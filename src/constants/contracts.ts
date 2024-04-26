import { Address } from 'viem';

type ContractAddresses = {
  lbp: Address;
  mbtc: Address;
  mdbl: Address;
  reward: Address;
  emdbl: Address;
  airdrop: Address;
};
export const CONTRACT_ADDRESSES: ContractAddresses =
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production'
    ? {
        // prod
        lbp: '0xDe7F454f021DBF7ECe47fe2E625e7c6706c596C0',
        mdbl: '0x8Aed42735027aa6d97023D8196B084eCFbA701af',
        mbtc: '0xB880fd278198bd590252621d4CD071b1842E9Bcd',
        reward: '0x0CB737625E3DfC287fbD4A806F90B912502C7e77',
        emdbl: '0x1F644a6BD4b47b10d60b6E3c7134AEC9023B23B5',
        airdrop: '0x82AF7C863AFB0154D8e501179D47d4BbA150C664',
      }
    : {
        // test
        lbp: '0x574Ea9117e1Ba2D218A0F814f85E9775eC5dda71',
        mdbl: '0xa1e8312144A51aDc8413082D2703c86E0cAA04f7',
        mbtc: '0x6E25b942c4536451512C8d3fCFCa390Efb7d1B33',
        reward: '0x37Ce49600B3c2EFDAb159aA2F229f70c10711CaF',
        emdbl: '0x874d189F4E70c5c283F9E33E389c8687Cc317E37',
        airdrop: '0xda42E394efC1efFA45d1DBc4f94bbC76cF8c4D33',
      };
