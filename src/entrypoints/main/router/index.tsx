import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import {
  BrowserRouter,
  Router as BaseRouter,
  Switch,
  Route
} from 'react-router-dom';
import type { History } from 'history';

import env from '../../../env';

import Header from '../../../components/header';
import Root from '../../../components/root';
import Footer from '../../../components/footer';
import AbsoluteRedirect from '../../../components/absolute-redirect';

const { FDK_REGISTRATION_BASE_URI } = env;

interface Props {
  history?: History;
}

const routes = {
  termsAndConditions: lazy(() => import('./terms-and-conditions'))
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
            <Route
              path='/terms-and-conditions'
              component={routes.termsAndConditions}
            />
            <AbsoluteRedirect to={FDK_REGISTRATION_BASE_URI} />
          </Switch>
        </Suspense>
      </Root>
      <Footer />
    </AppRouter>
  );
};

export default compose<FC>(memo)(Router);
