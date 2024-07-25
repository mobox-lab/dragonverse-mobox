import { UserGameInfo } from "@/apis/types";
import { atom } from "jotai";

export const userGameInfoAtom = atom<UserGameInfo | undefined>(undefined);
