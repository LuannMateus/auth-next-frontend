import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wrapper } from '../components/Wrapper';
import { gqlClient } from '../graphql/client';
import { GQL_MUTATION_DELETE_POST } from '../graphql/mutations/post';
import { GQL_QUERY_GET_POSTS } from '../graphql/queries/post';
import { frontendRedirect } from '../utils/frontendRedirect';
import { serverSideRedirect } from '../utils/serverSideRedirect';
import { Delete } from '@styled-icons/material-outlined';
import { DeleteButton } from '../components/Button/styles';
import { PostButtonContainer } from '../styles/pages/posts/styles';

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
  const [postsState, setPostsState] = useState(posts);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  if (!session && !status) {
    return frontendRedirect();
  }

  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session && status === 'unauthenticated') {
    return <p>Você não está autenticado</p>;
  }

  const handleDelete = async (id: string) => {
    setDeleting(true);

    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_POST,
        { id },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      setPostsState((s) => s.filter((p) => p.id !== id));
    } catch (e) {
      alert('Não foi possível excluir este post');
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || 'ninguém'}</h1>
      {postsState.map((p) => (
        <PostButtonContainer key={'post-' + p.id}>
          <Link href={`/${p.id}`}>
            <a>{p.title}</a>
          </Link>
          <DeleteButton onClick={() => handleDelete(p.id)} disabled={deleting}>
            <Delete />
          </DeleteButton>
        </PostButtonContainer>
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
