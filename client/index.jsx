import 'react-hot-loader/patch';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
// import { whyDidYouUpdate } from 'why-did-you-update';
import Perf from 'react-addons-perf';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureStore from 'store/configure';
import AppRoutes from 'routes';

const history = createBrowserHistory();

require('./styles/app.scss');

if (process.env.NODE_ENV === 'development') {
  window.Perf = Perf;
  // whyDidYouUpdate(React);
}

const store = configureStore({}, history);

const renderApp = () => (
  <Provider store={store} key={Math.random()}>
    <ConnectedRouter history={history} key={Math.random()}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>
);

const root = document.getElementById('app');

render(renderApp(), root);

if (module.hot) {
  module.hot.accept();
}
