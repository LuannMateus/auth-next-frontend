import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/globalStyles';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <NextNProgress
          color={theme.colors.info}
          startPosition={0.3}
          stopDelayMs={200}
          height={10}
        />
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
