import { PropsWithChildren } from 'react';

export default function ConnectButton({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div
      className="flex h-12 cursor-pointer items-center justify-center gap-2 bg-white/10 px-4 hover:bg-white/[0.16]"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
