import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data: session } = useSession();

  return (
    <>
      <span>Olá mundo </span>
      <pre>{session && JSON.stringify(session)}</pre>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
