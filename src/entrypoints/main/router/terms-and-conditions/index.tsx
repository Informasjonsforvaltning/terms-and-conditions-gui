import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import env from '../../../../env';

import { withAuth, Props as AuthProps } from '../../../../providers/auth';

import ProtectedRoute from '../../../../components/protected-route';
import AbsoluteRedirect from '../../../../components/absolute-redirect';

const { FDK_REGISTRATION_BASE_URI } = env;

const pages = {
  termsAndConditions: lazy(() => import('./pages/terms-and-conditions-page'))
};

interface Props extends AuthProps {}

const TermsAndConditionsRouter: FC<Props> = ({ authService }) => {
  const { path } = useRouteMatch();

  const isAuthorised = authService.isAuthenticated();

  const component = () => (
    <Suspense fallback={null}>
      <Switch>
        <Route
          exact
          path={`${path}/:organizationId(\\d{9})`}
          component={pages.termsAndConditions}
        />
        <AbsoluteRedirect to={FDK_REGISTRATION_BASE_URI} />
      </Switch>
    </Suspense>
  );

  const fallback = () => <Redirect to='/catalogs' />;

  return (
    <ProtectedRoute
      path={path}
      component={component}
      fallback={fallback}
      isAuthorised={isAuthorised}
    />
  );
};

export default compose<FC>(memo, withAuth)(TermsAndConditionsRouter);
