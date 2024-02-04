import { merlinTestnet } from '@/connectors/chains';

// TODO: replace MerlinMainnet
export const ALLOW_CHAIN = process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? merlinTestnet.id : merlinTestnet.id;
