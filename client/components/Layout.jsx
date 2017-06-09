import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
} from 'unchained-ui-react';

const App = (props) => {
  const {
    children,
  } = props;

  return (
    <div>
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
