import type { ReactNode } from 'react';

type ResultContainerProps = {
  children: ReactNode | Array<ReactNode>;
};

export default function ResultContainer({ children }: ResultContainerProps) {
  return <div className="mb-12 flex flex-col items-center justify-center gap-8">{children}</div>;
}
