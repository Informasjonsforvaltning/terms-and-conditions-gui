import React, { memo, FC, Suspense, lazy } from 'react';
import { BrowserRouter, Router as BaseRouter, Switch } from 'react-router-dom';
import { History } from 'history';

import env from '../../env';

import Root from '../root';
import Header from '../header';
import Footer from '../footer';
import ProtectedRoute from '../protected-route';
import AbsoluteRedirect from '../absolute-redirect';

import { Path, Environment } from '../../types/enums';

interface Props {
  history?: History;
}

const { ENV, FDK_REGISTRATION_BASE_URI } = env;

/* istanbul ignore next */
const pages = {
  root: {
    component: lazy(() => import('../terms-and-conditions-page')),
    fallback: () => null
  }
};

const Router: FC<Props> = ({ history }) => {
  const AppRouter: FC = ({ children }) =>
    history ? (
      <BaseRouter history={history}>{children}</BaseRouter>
    ) : (
      <BrowserRouter>{children}</BrowserRouter>
    );

  return (
    <AppRouter>
      <Header />
      <Root>
        <Suspense fallback={<></>}>
          <Switch>
            <ProtectedRoute
              exact
              path={`${
                ENV === Environment.DEVELOPMENT ? '' : '/terms-and-conditions'
              }${Path.ROOT}`}
              component={pages.root.component}
              fallback={pages.root.fallback}
            />
            <AbsoluteRedirect to={FDK_REGISTRATION_BASE_URI} />
          </Switch>
        </Suspense>
        <Footer />
      </Root>
    </AppRouter>
  );
};

export default memo(Router);
