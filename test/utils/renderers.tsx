import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Store, createStore, combineReducers } from 'redux';
import { Formik } from 'formik';

export const renderWithRouter = (
  children: any,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...options
  }: any = {}
) => {
  const rendered = render(
    <Router history={history}>{children}</Router>,
    options
  );
  return {
    ...rendered,
    rerender: (rerenderUi: any, rerenderOptions: any = {}) => {
      rendered.container.remove();
      return renderWithRouter(rerenderUi, rerenderOptions);
    },
    history
  };
};

export const renderWithRedux = (children: any, store: Store<any, any>) => {
  const rendered = render(
    <ReduxProvider store={store}>{children}</ReduxProvider>
  );
  return {
    ...rendered,
    rerender: (rerenderUi: any, rerenderStore: Store<any, any>) => {
      rendered.container.remove();
      return renderWithRedux(rerenderUi, rerenderStore);
    }
  };
};

export const renderWithFormik = (
  children: any,
  { initialValues = {}, onSubmit = () => {} }: any
) => {
  const rendered = render(
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => children}
    </Formik>
  );
  return {
    ...rendered,
    rerender: (rerenderUi: any, rerenderOptions: any) => {
      rendered.container.remove();
      return renderWithFormik(rerenderUi, rerenderOptions);
    }
  };
};

export const renderWithRouterAndRedux = (
  children: any,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    store = createStore(combineReducers({})),
    ...options
  }: any = {}
) => {
  const rendered = render(
    <Router history={history}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </Router>,
    options
  );
  return {
    ...rendered,
    rerender: (rerenderUi: any, rerenderOptions: any) => {
      rendered.container.remove();
      return renderWithRouterAndRedux(rerenderUi, rerenderOptions);
    }
  };
};

export const renderWithRouterAndReduxAndFormik = (
  children: any,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    store = createStore(combineReducers({})),
    initialValues = {},
    onSubmit = () => {},
    ...options
  }: any = {}
) => {
  const rendered = render(
    <Router history={history}>
      <ReduxProvider store={store}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => children}
        </Formik>
      </ReduxProvider>
    </Router>,
    options
  );
  return {
    ...rendered,
    rerender: (rerenderUi: any, rerenderOptions: any) => {
      rendered.container.remove();
      return renderWithRouterAndReduxAndFormik(rerenderUi, rerenderOptions);
    }
  };
};
