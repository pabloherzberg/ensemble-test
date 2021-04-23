import React from 'react';
import ReactDOM from 'react-dom';
import Route from './routes';
import GlobalStyle from './styles/global';
import ContextProvider from './context/Context';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Route />
    </ContextProvider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root'),
);
