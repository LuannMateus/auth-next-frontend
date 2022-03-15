import { useSession } from 'next-auth/react';
import { Wrapper } from '../components/Wrapper';

export default function OpenRoutePage() {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h1>Essa rota é aberta</h1>

      {session?.user?.name ? (
        <p>Olá {session.user.name}.</p>
      ) : (
        <p>Olá, você ainda não fez login.</p>
      )}
    </Wrapper>
  );
}
