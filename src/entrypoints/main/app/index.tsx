import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from '@fellesdatakatalog/theme';

import AuthProvider from '../../../providers/auth';

import store from '../redux/store';

import GlobalStyles from '../styles';
import theme from '../styles/theme';

import Router from '../router';

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <AuthProvider>
      <ReduxProvider store={store}>
        <Router />
      </ReduxProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
