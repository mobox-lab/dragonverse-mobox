import { bindInvitationCode, fetchInvitationInfo, fetchInviteHistory, fetchInviterAddressByCode } from '@/apis';
import { InviteHistoryItem } from '@/apis/types';
import { gameReferralHistoryDrawerAtom } from '@/atoms/assets';
import { invitationInfoAtom } from '@/atoms/user';
import { shortenAddress } from '@/utils/shorten';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

const inviteHelper = createColumnHelper<InviteHistoryItem>();

export const useInviteHistoryColumns = () => {
  return useMemo(
    () => [
      inviteHelper.accessor('timestamp', {
        header: () => <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue()).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          );
        },
      }),
      inviteHelper.accessor('referred', {
        header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-12">Referred</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[3.84vw] flex-grow text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5">
              {shortenAddress(getValue())}
            </p>
          );
        },
      }),
      inviteHelper.accessor('commission', {
        header: () => <p className="w-[3.84vw] flex-grow-[1] pr-[1.28vw] xl:w-12 xl:pr-4">Commission</p>,
        cell: ({ getValue }) => {
          return (
            <p className="flex w-[3.84vw] flex-grow-[1] items-center justify-end pr-[1.28vw] text-right text-[1.12vw]/[1.44vw] font-medium xl:w-12 xl:pr-4 xl:text-sm/4.5">
              {getValue()} $MDBL
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
  }, [isOpen, result]);
  return result;
};

export const useFetchDrawerInvitationInfo = () => {
  const isOpen = useAtomValue(gameReferralHistoryDrawerAtom);

  const result = useQuery({
    queryKey: ['fetch_drawer_invitation_code'],
    queryFn() {
      return fetchInvitationInfo();
    },
    select: (res) => (res?.code === 200 ? res?.data : null),
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      result.refetch();
    }
  }, [isOpen, result]);

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

export const useFetchInviterAddressByCode = (code?: string | string[]) => {
  const result = useQuery({
    queryKey: ['fetch_inviter_address_by_code', code],
    queryFn() {
      return fetchInviterAddressByCode(code as string);
    },
    select: (res) => (res?.code === 200 ? res?.data : null),
    enabled: !!code && typeof code === 'string',
  });

  return result;
};

export const useMutationBindInviteCode = () => {
  return useMutation({
    mutationKey: ['bind_invite_code'],
    mutationFn: (code: string) => bindInvitationCode(code),
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
