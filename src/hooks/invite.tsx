import {
  bindInvitationCode,
  claimReferralReward,
  fetchInvitationInfo,
  fetchInviteHistory,
  fetchInviterAddressByCode,
} from '@/apis';
import { InviteHistoryItem } from '@/apis/types';
import { gameReferralHistoryDrawerAtom, walletAssetsDrawerAtom } from '@/atoms/assets';
import { shortenAddress } from '@/utils/shorten';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import { formatEther } from 'viem';

const inviteHelper = createColumnHelper<InviteHistoryItem>();

export const useInviteHistoryColumns = () => {
  return useMemo(
    () => [
      inviteHelper.accessor('timestamp', {
        header: () => <p className="w-[3.84vw] flex-grow pl-[1.28vw] text-left xl:w-12 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[3.84vw] flex-grow pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:pl-4 xl:text-xs/4.5">
              {dayjs.unix(getValue() ?? 0).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          );
        },
      }),
      inviteHelper.accessor('referred', {
        header: () => <p className="w-[3.84vw] flex-grow text-left xl:w-12">Referred</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[3.84vw] flex-grow text-left text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5">
              {shortenAddress(getValue())}
            </p>
          );
        },
      }),
      inviteHelper.accessor('commission', {
        header: () => <p className="w-[3.84vw] flex-grow pr-[1.28vw] xl:w-12 xl:pr-4">Commission</p>,
        cell: ({ getValue }) => {
          return (
            <p className="flex w-[3.84vw] flex-grow items-center justify-end pr-[1.28vw] text-right text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:w-12 xl:pr-4 xl:text-sm/6">
              {Number(formatEther(BigInt(getValue() ?? 0)))} $MDBL
            </p>
          );
        },
      }),
    ],
    [],
  );
};

export const useFetchInviteHistory = () => {
  const isOpen = useAtomValue(gameReferralHistoryDrawerAtom);

  const result = useQuery({
    queryKey: ['fetch_invite_history'],
    queryFn() {
      return fetchInviteHistory();
    },
    select: (res) => {
      const { code: statusCode, data } = res ?? {};
      if (statusCode === 200) {
        return data;
      }
    },
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      result.refetch();
    }
  }, [isOpen]);
  return result;
};

export const useFetchDrawerInvitationInfo = () => {
  const isOpen = useAtomValue(walletAssetsDrawerAtom);

  const result = useQuery({
    queryKey: ['fetch_invitation_code'],
    queryFn() {
      return fetchInvitationInfo();
    },
    select: (res) => {
      return res?.code === 200 ? res?.data : null;
    },
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      result.refetch();
    }
  }, [isOpen]);

  return result;
};

export const useFetchInvitationInfo = () => {
  const result = useQuery({
    queryKey: ['fetch_invitation_code'],
    queryFn() {
      return fetchInvitationInfo();
    },
    select: (res) => (res?.code === 200 ? res?.data : null),
  });

  return result;
};

export const useFetchInviterAddressByCode = (code?: string) => {
  const result = useQuery({
    queryKey: ['fetch_inviter_address_by_code', code],
    queryFn() {
      return fetchInviterAddressByCode(code as string);
    },
    select: (res) => (res?.code === 200 ? res?.data : null),
    enabled: !!code,
  });

  return result;
};

export const useMutationBindInviteCode = () => {
  return useMutation({
    mutationKey: ['bind_invite_code'],
    mutationFn: (code: string) => bindInvitationCode(code),
  });
};

export const useMutationClaimReferralReward = () => {
  return useMutation({
    mutationKey: ['claim_referral_reward'],
    mutationFn: () => claimReferralReward(),
  });
};

// export const useFetchUserByInviteCode = (code?: string | string[]) => {
//   return useQuery(['fetch_user_info_by_invite_code', code], () => fetchUserByInviteCode(code as string), {
//     enabled: !!code && typeof code === 'string',
//     select: (res) => {
//       const { code: statusCode, data } = res ?? {};
//       if (statusCode === 200) {
//         return { ...data, code };
//       }
//     },
//     onSuccess: () => {
//       ReactGA.event({ action: EventName.ReferralShareShow, category: EventCategory.Global, label: code?.toString() });
//     },
//   });
// };

// export const useMutationBindInviteCode = () => {
//   return useMutation((code?: string) => bindInvitationCode(code), {
//     onError: (e) => {
//       console.error('Failed to accept, an error occurred', e);
//     },
//   });
// };
