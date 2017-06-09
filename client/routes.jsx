import React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Layout from 'components/Layout';

import {
  CMSPageBuilder
} from 'unchained-ui';

const projectComponents = require('components');

const pageBuilder = (props) => {
  return <CMSPageBuilder {...props} projectComponents={projectComponents} />;
};

const RedirectToEn = () => <Redirect to={'/en/'} />;

const AppRoutes = () => (
  <Switch>
    <Layout>
      <Switch>
        <Route exact path={'/'} render={RedirectToEn} />
        <Route path={'/*'} component={pageBuilder} />
      </Switch>
    </Layout>
  </Switch>
);

export default AppRoutes;
