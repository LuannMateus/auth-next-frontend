import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  :root {
    font-size: 62.5%;
  }

  html, body {
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.font.family.default};
    background: ${({ theme }) => theme.colors.primary};
    scroll-behavior: smooth;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.font.family.secondary};
  }

  p {
    margin: ${({ theme }) => theme.spacings.medium} 0;
  }

  ul, ol {
    margin: ${({ theme }) => theme.spacings.medium};
    padding: ${({ theme }) => theme.spacings.medium};
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
  }

  .table {
    width: 100%;
    overflow-y: auto;
  }
`;
