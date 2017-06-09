import React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Layout from 'components/Layout';

const RedirectToEn = () => <Redirect to={'/en/'} />;

const AppRoutes = () => (
  <Switch>
    <Layout>
      <Switch>
        <Route exact path={'/'} render={RedirectToEn} />
      </Switch>
    </Layout>
  </Switch>
);

export default AppRoutes;
