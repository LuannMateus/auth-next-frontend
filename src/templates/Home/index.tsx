import { useSession } from 'next-auth/react';
import { Wrapper } from '../../components/Wrapper';

export function Home() {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || 'ninguém'}</h1>
    </Wrapper>
  );
}
