'use client';

import { useConnect } from 'wagmi';
import { Platform } from '@/constants/enum';
import { useCallback, useMemo } from 'react';
import { useMutationLogin } from '@/hooks/user';
import { useSignInWithEthereum } from '@/hooks/useSignInWithEthereum';

export function useSignInCallback() {
  const { mutate } = useMutationLogin();

  const { signInWithEthereum } = useSignInWithEthereum({
    onSuccess: (args) => mutate({ ...args, platform: Platform.USER }),
  });
  const { connect, connectors } = useConnect();

  const connectWallet = useCallback(
    (connector: any | undefined) => {
      connector &&
        connect(
          { connector },
          {
            onSuccess: () => {},
            onError: (error, { connector }) => {
              if (error.message === 'ConnectorNotFoundError' && connector.name === 'MetaMask') {
                window.open('https://metamask.io');
                return;
              }
              if (error.message === 'ConnectorNotFoundError' && connector.name === 'okx wallet') {
                const userAgent = navigator.userAgent.toLowerCase();
                const isPC = /Windows|Linux|Macintosh/i.test(userAgent);
                const isiOS = /iPhone|iPad|iPod/i.test(userAgent);
                const isAndroid = /Android/i.test(userAgent);
                if (isiOS) {
                  window.location.href = 'https://apps.apple.com/gb/app/okx-buy-bitcoin-eth-crypto/id1327268470';
                } else if (isAndroid) {
                  window.location.href =
                    'https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.okinc.okex.gp';
                } else if (isPC) {
                  window.open('https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge');
                }

                return;
              }
            },
          },
        );
    },
    [connect],
  );

  return useMemo(
    () => ({
      connectors,
      connectWallet,
      signInWithEthereum,
    }),
    [connectWallet, connectors, signInWithEthereum],
  );
}
