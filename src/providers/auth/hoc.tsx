import React, { ComponentType } from 'react';

import service from '../../services/auth';

import Context from './context';

export type ServiceProps = { authService: typeof service };
type AuthProps<P> = P & ServiceProps;

export const withAuth =
  <C extends ComponentType<AuthProps<any>>>(
    Child: C
  ): ComponentType<Omit<AuthProps<any>, keyof ServiceProps>> =>
  (props: any) =>
    (
      <Context.Consumer>
        {({ service: authService }) => (
          <Child {...props} authService={authService} />
        )}
      </Context.Consumer>
    );
