import { useSession } from 'next-auth/react';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_UPDATE_POST } from '../../graphql/mutations/post';
import { FormPost, StrapiPost } from '../../components/FormPost';
import { Wrapper } from '../../components/Wrapper';

export type UpdatePostTemplateProps = {
  post: StrapiPost;
};

export function UpdatePostTemplate({ post }: UpdatePostTemplateProps) {
  const { data: session } = useSession();

  const handleSave = async ({ id, title, content }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_UPDATE_POST,
        {
          id,
          title,
          content,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
    } catch (e) {
      alert('Erro ao salvar o post');
    }
  };

  if (!post) {
    return (
      <Wrapper>
        <p>O post não existe!</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormPost onSave={handleSave} post={post} />
    </Wrapper>
  );
}
