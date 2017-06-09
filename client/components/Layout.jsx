import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
} from 'unchained-ui-react';

import {
  HeaderTopContainer,
} from 'containers';

const App = (props) => {
  const {
    children,
  } = props;

  return (
    <div>
      <HeaderTopContainer />
      <Container id={'content-container'} fluid>
        {children}
      </Container>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.any,
};

export default App;
