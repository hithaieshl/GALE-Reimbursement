import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

const App = (props) => {
  const {
    store,
    history,
    routes,
  } = props;

  return (
    <Provider store={store} key={Math.random()}>
      <Router history={history} key={Math.random()}>
        {routes}
      </Router>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
  routes: PropTypes.func,
};

export default App;
