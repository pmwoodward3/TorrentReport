import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import 'web-animations-js';
import store from './store';
import theme from './theme';
import Routes from './routes';

// establishes socket connection
import './socket';
// eslint-disable-next-line
injectGlobal`
  body {
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box
  }
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CookiesProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </CookiesProvider>
  </ThemeProvider>,
  document.getElementById('app'),
);
