import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormPost } from '../../components/FormPost';
import { Wrapper } from '../../components/Wrapper';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_CREATE_POST } from '../../graphql/mutations/post';

export function CreatePostTemplate() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSave = async ({ title, content }) => {
    try {
      const response = await gqlClient.request(
        GQL_MUTATION_CREATE_POST,
        {
          title,
          content,
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      const {
        createPost: { post },
      } = response;

      if (post) {
        router.push(`/${post.id}`);
      } else {
        throw new Error('Erro ao criar');
      }
    } catch (e) {
      alert('Erro ao criar o post');
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} />
    </Wrapper>
  );
}
