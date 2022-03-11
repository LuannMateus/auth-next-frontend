import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/globalStyles';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
