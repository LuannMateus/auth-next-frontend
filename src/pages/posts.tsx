import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { gqlClient } from '../graphql/client';
import { GQL_QUERY_GET_POSTS } from '../graphql/queries/post';
import { serverSideRedirect } from '../utils/serverSideRedirect';
import { StrapiPost } from '../components/FormPost';
import { PrivateComponent } from '../components/PrivateComponent';
import { PostsTemplate } from '../templates/PostsTemplate';

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export default function PostsPages({ posts = [] }: PostsPageProps) {
  return (
    <PrivateComponent>
      <PostsTemplate posts={posts} />
    </PrivateComponent>
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
