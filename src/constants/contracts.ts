import { Address } from 'viem';

type ContractAddresses = {
  lbp: Address;
  mbtc: Address;
  mdbl: Address;
  reward: Address;
  emdbl: Address;
  airdrop: Address;
  batchBurn: Address;
  mDragonBall: Address;
  leaderboardRewards: Address;
  claimMerl: Address;
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
        batchBurn: '0xF6534dC2Fcb82a97E44E32FddF130CDe58777533',
        mDragonBall: '0x7c09e01c9257a404d5caf5c3dfa79bc00281734e',
        leaderboardRewards: '0xA40748E0caCfbF986ac68b884644b3B9011D0394',
        claimMerl: '0x484Ac4edC23d8b435D1DEe5e9221d428E507f3c8',
      }
    : {
        // test
        lbp: '0x574Ea9117e1Ba2D218A0F814f85E9775eC5dda71',
        mdbl: '0xa1e8312144A51aDc8413082D2703c86E0cAA04f7',
        mbtc: '0x6E25b942c4536451512C8d3fCFCa390Efb7d1B33',
        reward: '0x37Ce49600B3c2EFDAb159aA2F229f70c10711CaF',
        emdbl: '0x874d189F4E70c5c283F9E33E389c8687Cc317E37',
        airdrop: '0xda42E394efC1efFA45d1DBc4f94bbC76cF8c4D33',
        batchBurn: '0x0786F335A0b0DF05D0224aF0c99B464b39078dF0',
        mDragonBall: '0x9Da60078e7B225820D7781D942E9f222c30Ed216',
        leaderboardRewards: '0x81bdd98Bce37FB7C45a636bcE781DD17fBC46afE',
        claimMerl: '0xFd9Ff70045914a4A258339c8d0E1fBA95a248330',
      };
