import NextAuth, { Session, User, DefaultUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gqlClient } from '../../../graphql/client';
import { GQL_MUTATION_AUTHENTICATE_USER } from '../../../graphql/mutations/auth';

type NextAuthSession = {
  id: string;
  jwt: string;
  name: string;
  email: string;
  expiration: number;
};

type NextAuthJwtCallbackProps = {
  token: NextAuthSession;
  user: NextAuthSession;
};

type NextAuthSessionCallbackProps = {
  session: Session & {
    user: DefaultUser;
  };
  user: User;
  token: NextAuthSession;
};

type CredentialsProps = {
  email: string;
  password: string;
};

export default NextAuth({
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: CredentialsProps) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { login } = await gqlClient.request(
            GQL_MUTATION_AUTHENTICATE_USER,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          const { jwt, user } = login;
          const { id, username, email } = user;

          if (!jwt || !id || !username || !email) {
            return null;
          }

          return {
            jwt,
            id,
            name: username,
            email,
          };
        } catch (e) {
          console.log(e);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: NextAuthJwtCallbackProps) => {
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

      if (isSignIn) {
        if (!user || !user.jwt || !user.name || !user.email || !user.id) {
          return Promise.resolve({});
        }

        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;

        token.expiration = Math.floor(
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDateInSeconds > token.expiration) return Promise.resolve({});

        console.log('USUARIO LOGADO:', token);
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }: NextAuthSessionCallbackProps) => {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.expiration ||
        !token?.email ||
        !token?.name
      ) {
        return null;
      }

      session.accessToken = token.jwt;
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      };

      return { ...session };
    },
  },
});
