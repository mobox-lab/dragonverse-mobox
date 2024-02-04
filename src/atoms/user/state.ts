import { atom } from 'jotai';

export const isEditorLoginOpenAtom = atom<boolean>(false);
export const isSSOLoginLoadingAtom = atom<boolean>(false);

export const accessTokenAtom = atom<string | undefined>(undefined);
