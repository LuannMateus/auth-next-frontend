import { Delete } from '@styled-icons/material-outlined';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteButton } from '../../components/Button/styles';
import { Wrapper } from '../../components/Wrapper';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_DELETE_POST } from '../../graphql/mutations/post';
import { PostsPageProps } from '../../pages/posts';
import { PostButtonContainer } from '../../styles/pages/posts/styles';

export function PostsTemplate({ posts }: PostsPageProps) {
  const { data: session } = useSession();
  const [postsState, setPostsState] = useState(posts);
  const [deleting, setDeleting] = useState(false);
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
