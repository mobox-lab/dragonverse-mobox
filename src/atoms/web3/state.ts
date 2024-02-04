import { atom } from 'jotai';
import { Address } from 'viem';

export const isConnectOpenAtom = atom<boolean>(false);

export const accessTokensAtom = atom<Record<Address, string>>({});

export const defaultChainIdAtom = atom<number | undefined>(undefined);
