import React, { memo, ComponentType, FC, Fragment } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { withAuth, Props as AuthProps } from '../../providers/auth';

interface Props extends AuthProps, RouteProps {
  component: ComponentType<any>;
  fallback: ComponentType<any>;
}

const ProtectedRoute: FC<Props> = ({
  authService,
  component: Component = Fragment,
  fallback: Fallback = Fragment,
  children,
  ...props
}) => (
  <Route
    {...props}
    render={(routeProps: RouteProps) =>
      authService.isAuthenticated() ? (
        <Component {...routeProps} />
      ) : (
        <Fallback {...routeProps} />
      )
    }
  />
);

export default memo(withAuth(ProtectedRoute));
