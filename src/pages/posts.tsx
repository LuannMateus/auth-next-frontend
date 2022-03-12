import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { Wrapper } from '../components/Wrapper';
import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_POSTS } from '../graphql/queries/post';
import { frontendRedirect } from '../utils/frontendRedirect';
import { serverSideRedirect } from '../utils/serverSideRedirect';

export type StrapiPost = {
  id?: string;
  title: string;
  content: string;
};

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export default function PostsPages({ posts = [] }: PostsPageProps) {
  const { data: session, status } = useSession();

  if (!session && !status) {
    return frontendRedirect();
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session && status === 'unauthenticated') {
    return <p>Você não está autenticado</p>;
  }

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || 'ninguém'}</h1>
      {posts.map((p) => (
        <p key={'post-' + p.id}>
          <Link href={`/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </p>
      ))}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const { posts } = await gqlClient.request(GQL_QUERY_GET_POSTS, null, {
      Authorization: `Bearer ${session.accessToken}`,
    });

    return {
      props: {
        posts,
      },
    };
  } catch (e) {
    return serverSideRedirect(ctx);
  }
};
