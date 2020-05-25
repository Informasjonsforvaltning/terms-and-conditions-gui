import React, { memo, FC } from 'react';
import { Route } from 'react-router-dom';

interface Props {
  to: string;
}

const AbsoluteRedirect: FC<Props> = ({ to }) => (
  <Route
    render={() => {
      location.assign(to);
      return null;
    }}
  />
);

export default memo(AbsoluteRedirect);
