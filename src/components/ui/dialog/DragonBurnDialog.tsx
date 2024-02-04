'use client';
import BurnSvg from '@/../public/svg/burn.svg?component';
import GreenArrowSvg from '@/../public/svg/green-arrow.svg?component';
import { dragonBurnDialogOpenAtom } from '@/atoms/dragonverse';
import Dialog from '@/components/ui/dialog';
import { MOBOX_GOVERN_FORGE_ADDRESS, MOBOX_TOKEN_ADDRESS } from '@/constants';
import { useBurnMobox } from '@/hooks/burn';
import { useApproveToken, useTokenAllowance } from '@/hooks/useAllowance';
import { useCorrectNetwork } from '@/hooks/useIsCorrectNetwork';
import { clsxm, shortenBalance } from '@/utils';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther } from 'viem';
import { useAccount, useBalance, useBlockNumber } from 'wagmi';
import Button from '../button';
import { useFetchP12DragonProposalNum } from '@/hooks/useFetchP12DragonProposalNum';
import { useQueryClient } from '@tanstack/react-query';

const unitPrice = 2000; // 多少 mobox 换一个提案机会
export default function DragonBurnDialog() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useAtom(dragonBurnDialogOpenAtom);
  const [proposalNum, setProposalNum] = useState(0);
  const burnCost = useMemo(() => unitPrice * proposalNum, [proposalNum]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refetch } = useFetchP12DragonProposalNum();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { address } = useAccount();
  const { isCorrectNetwork, switchNetwork } = useCorrectNetwork();
  const { data: balance, queryKey } = useBalance({ address, token: MOBOX_TOKEN_ADDRESS });
  const [tokenAllowance, allowanceRefetch] = useTokenAllowance(MOBOX_TOKEN_ADDRESS, address, MOBOX_GOVERN_FORGE_ADDRESS);
  const { write: burnMobox } = useBurnMobox({
    proposalNum,
    onSuccess: () => {
      setIsLoading(false);
      refetch();
      toast.success('Burn Mobox Success.');
      setTimeout(() => setIsOpen(false), 800);
    },
    onError: (error) => {
      if (error.name === 'ContractFunctionExecutionError') {
        toast.warning(`Insufficient balance, estimated ${burnCost} $MBOX`);
      } else toast.error('Burn Mobox Error.');
      setIsLoading(false);
    },
  });

  const { write: approveToken } = useApproveToken({
    token: MOBOX_TOKEN_ADDRESS,
    spender: MOBOX_GOVERN_FORGE_ADDRESS,
    onSuccess: () => {
      allowanceRefetch?.();
      burnMobox();
    },
    onError: () => {
      toast.error('Approve Token Error.');
      setIsLoading(false);
    },
  });

  const minusProposal = useCallback(() => {
    if (proposalNum <= 0) return;
    setProposalNum(proposalNum - 1);
  }, [proposalNum]);
  const addProposal = useCallback(() => {
    if (proposalNum + 1 > 5) return;
    setProposalNum(proposalNum + 1);
  }, [proposalNum]);

  const submit = useCallback(() => {
    setIsLoading(true);
    if (!isCorrectNetwork) {
      switchNetwork?.();
      setIsLoading(false);
      return;
    }
    if (tokenAllowance && tokenAllowance > (burnCost ?? 0)) {
      burnMobox();
    } else {
      approveToken();
    }
  }, [approveToken, burnCost, burnMobox, isCorrectNetwork, switchNetwork, tokenAllowance]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryKey]);

  return (
    <Dialog
      open={isOpen}
      className="w-[37.6vw] md:h-auto md:max-h-[80%] xl:w-[470px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div className="flex w-full flex-col items-center text-center">
          <h1 className="text-[1.6vw]/[1.6vw] font-semibold xl:text-xl/5">Burn Mechanism</h1>
          <p className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-1 xl:text-sm/6">Dragonverse Neo Governance</p>
          <div className="mt-10 flex items-center">
            <img src="/img/mobox.png" alt="" className="h-[3.84vw] w-[3.84vw] xl:h-12 xl:w-12" />
            <div className="ml-[0.8vw] flex flex-col gap-[0.16vw] text-left xl:ml-2.5 xl:gap-0.5">
              <p className="text-[1.6vw]/[1.92vw] font-semibold xl:text-xl/6">MBOX</p>
              <p className="text-[1.12vw]/[1.92vw] font-semibold xl:text-sm/6">
                Balance: <span className="text-yellow">{shortenBalance(Number(formatEther(BigInt(balance?.value ?? 0))))}</span>
              </p>
            </div>
            <div className="ml-[1.28vw] mr-[0.96vw] text-[1.12vw]/[1.12vw] xl:ml-4 xl:mr-3 xl:text-sm/3.5">
              Burn
              <GreenArrowSvg className="h-[2.56vw] w-[6.56vw] xl:h-8 xl:w-20.5" />
            </div>
            <BurnSvg className="h-[4.64vw] w-[4.64vw] xl:h-14.5 xl:w-14.5" />
          </div>
          <div className="flex-center mt-[1.28vw] select-none whitespace-nowrap text-[1.12vw]/[1.92vw] font-medium xl:mt-4 xl:text-sm/6">
            Get
            <div className="mx-[0.64vw] flex select-none items-center xl:mx-2">
              <span
                className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer bg-white/10 xl:h-10 xl:w-10"
                onClick={minusProposal}
              >
                -
              </span>
              <div className="-mr-px h-[2.56vw] w-px bg-gray xl:h-8" />
              <span className="flex-center h-[3.2vw] w-[4.64vw] cursor-pointer bg-white/10 xl:h-10 xl:w-14.5">
                {proposalNum}
              </span>
              <div className="-mr-px h-[2.56vw] w-px bg-gray xl:h-8" />
              <span
                className={clsxm('flex-center h-[3.2vw] w-[3.2vw] cursor-pointer bg-white/10 xl:h-10 xl:w-10', {
                  'cursor-default bg-gray-300/10': proposalNum === 5,
                })}
                onClick={addProposal}
              >
                +
              </span>
            </div>
            proposals burning
            <span className="ml-[0.96vw] text-[1.12vw]/[2.4vw] font-medium text-yellow xl:ml-3 xl:text-sm/7.5">
              <span className="text-xl/7.5 font-semibold">{burnCost}</span> $MBOX
            </span>
          </div>
          <div className="mt-[3.2vw] text-left text-[0.96vw]/[1.6vw] font-medium text-white/80 xl:mt-10 xl:text-xs/5">
            Check your eligibility for creating proposals:
            <ul className="ml-[1.28vw] list-disc xl:ml-4">
              <li>Burning {unitPrice} $MBOX gives 1 proposal opportunity</li>
              <li>Maintain a balance of 10000 $veMBOX</li>
            </ul>
            <p className="mt-[0.96vw] whitespace-pre-wrap xl:mt-3">
              {
                'Note:\nPlease use the Dragonverse Neo burning mechanism to acquire proposal rights; other burning (destruction) methods are not valid.'
              }
            </p>
          </div>
          <Button
            disabled={!proposalNum}
            type="red"
            loading={isLoading}
            onClick={submit}
            className="mt-[1.6vw] h-[3.52vw] self-stretch text-[1.28vw]/[1.6vw] font-semibold xl:mt-5 xl:h-11 xl:text-base/5"
          >
            Submit
          </Button>
        </div>
      )}
    />
  );
}
