import React, { Fragment } from 'react';
import Keyboardist from 'react-keyboardist';

import { Route, withRouter } from 'react-router-dom';

let KeyboardRoute = ({ keyName = null, history, ...props }) => {
  if (keyName === null) {
    return <Route {...props} />;
  }

  const bindings = {
    [keyName]: () => {
      history.push(props.path);
      return false;
    },
  };

  return (
    <Fragment>
      <Keyboardist bindings={bindings} />
      <Route {...props} />
    </Fragment>
  );
};

KeyboardRoute = withRouter(KeyboardRoute);

export default KeyboardRoute;
