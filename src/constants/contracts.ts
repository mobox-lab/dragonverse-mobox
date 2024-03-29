import { Address } from 'viem';

type ContractAddresses = {
  lbp: Address;
  mbtc: Address;
  mdbl: Address;
  reward: Address;
};
export const CONTRACT_ADDRESSES: ContractAddresses =
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production'
    ? {
        // prod
        lbp: '0xce237e02d5fAEE00607562FCD31c531579417e42',
        mdbl: '0xa592297ff2a8f214d14fb5039e092407eeccb297',
        mbtc: '0xB880fd278198bd590252621d4CD071b1842E9Bcd',
        reward: '0x72A8c0063551c8005eF5690b0066145544fA7Bec',
      }
    : {
        // test
        lbp: '0x574Ea9117e1Ba2D218A0F814f85E9775eC5dda71',
        mdbl: '0xa1e8312144A51aDc8413082D2703c86E0cAA04f7',
        mbtc: '0x6E25b942c4536451512C8d3fCFCa390Efb7d1B33',
        reward: '0x37Ce49600B3c2EFDAb159aA2F229f70c10711CaF',
      };
