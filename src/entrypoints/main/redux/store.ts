import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import RootReducer from './reducer';
import RootSaga from './saga';

import AuthService from '../../../services/auth/auth-service';

const sagaMiddleware = createSagaMiddleware({
  context: {
    auth: AuthService
  }
});

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);

(module as any).hot?.accept();

export default store;
