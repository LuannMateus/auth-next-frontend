import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { Wrapper } from '../components/Wrapper';

export default function Index() {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || 'ninguém'}</h1>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
