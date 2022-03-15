import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { frontendRedirect } from '../../utils/frontendRedirect';

export type PrivateComponentProps = {
  children: ReactNode;
};

export const PrivateComponent = ({ children }: PrivateComponentProps) => {
  const { data: session, status } = useSession();

  if (!session && status === 'unauthenticated') {
    return frontendRedirect();
  }

  if (typeof window !== undefined && status === 'loading') return null;

  if (!session && status === 'unauthenticated') {
    return null;
  }

  return children;
};
