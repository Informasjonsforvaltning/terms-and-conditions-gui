import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Route } from 'react-router-dom';

interface ExternalProps {
  to: string;
}

interface Props extends ExternalProps {}

const AbsoluteRedirect: FC<Props> = ({ to }) => (
  <Route
    render={() => {
      location.assign(to);
      return null;
    }}
  />
);

export default compose<FC<ExternalProps>>(memo)(AbsoluteRedirect);
