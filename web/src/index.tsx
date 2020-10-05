import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import './index.scss';
import AppRouter from './app-router/AppRouter';
import * as serviceWorker from './serviceWorker';
import { UserProvider } from './service/user';
import ErrorBoundary from './config/error-boundary/error-boundary.component';

ReactDOM.render(
  <React.StrictMode>
        <UserProvider>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
