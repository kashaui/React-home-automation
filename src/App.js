import styled, { createGlobalStyle } from 'styled-components';

import { Breadcrumbs } from './components/breadcrumbs';
import { Devices } from './components/devices';
import { Nav } from './components/nav';
import { Provider } from 'rendition';
import React from 'react';

const GlobalStyle = createGlobalStyle([], {
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    minHeight: '100%',
  },
  body: {
    minHeight: '100vh',
    margin: 0,
    padding: 0,
  },
  '#root': {
    minHeight: '100vh',
  },
});

const FullHeightProvider = styled(Provider)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const App = () => {
  return (
    <FullHeightProvider>
      <GlobalStyle />

      <Nav />
      <Breadcrumbs />
      <Devices />
    </FullHeightProvider>
  );
};
