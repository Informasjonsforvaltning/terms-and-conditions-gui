import { all, call, takeLatest, getContext, put } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  GET_LATEST_TERMS_AND_CONDITIONS_REQUESTED,
  GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_REQUESTED,
  ACCEPT_TERMS_AND_CONDITIONS_REQUESTED
} from './action-types';

import AuthService from '../../../services/auth';

const { TERMS_AND_CONDITIONS_HOST } = env;

function* getLatestTermsAndConditionsRequested() {
  try {
    const auth: typeof AuthService = yield getContext('auth');
    const authorization: string = yield call([
      auth,
      auth.getAuthorizationHeader
    ]);

    const { data, message } = yield call(
      axios.get,
      `${TERMS_AND_CONDITIONS_HOST}/terms/latest`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );

    if (data) {
      yield put(actions.getLatestTermsAndConditionsSucceeded(data));
    } else {
      yield put(
        actions.getLatestTermsAndConditionsFailed(JSON.stringify(message))
      );
    }
  } catch (e) {
    yield put(actions.getLatestTermsAndConditionsFailed(e.message));
  }
}

function* getLatestAcceptedTermsAndConditionsRequested({
  payload: { organizationId }
}: ReturnType<typeof actions.getLatestAcceptedTermsAndConditionsRequested>) {
  try {
    const auth: typeof AuthService = yield getContext('auth');
    const authorization: string = yield call([
      auth,
      auth.getAuthorizationHeader
    ]);

    const { data, message } = yield call(
      axios.get,
      `${TERMS_AND_CONDITIONS_HOST}/terms/org/${organizationId}`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );

    if (data) {
      yield put(actions.getLatestAcceptedTermsAndConditionsSucceeded(data));
    } else {
      yield put(
        actions.getLatestAcceptedTermsAndConditionsFailed(
          JSON.stringify(message)
        )
      );
    }
  } catch (e) {
    yield put(actions.getLatestAcceptedTermsAndConditionsFailed(e.message));
  }
}

function* acceptTermsAndConditionsRequested({
  payload: { acceptation, onSuccess }
}: ReturnType<typeof actions.acceptTermsAndConditionsRequested>) {
  try {
    const auth: typeof AuthService = yield getContext('auth');
    const authorization: string = yield call([
      auth,
      auth.getAuthorizationHeader
    ]);

    const { status, message } = yield call(
      axios.post,
      `${TERMS_AND_CONDITIONS_HOST}/terms/org`,
      acceptation,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );

    if (status === 201) {
      yield put(actions.acceptTermsAndConditionsSucceeded(acceptation));
      onSuccess?.();
    } else {
      yield put(
        actions.acceptTermsAndConditionsFailed(JSON.stringify(message))
      );
    }
  } catch (e) {
    yield put(actions.acceptTermsAndConditionsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      GET_LATEST_TERMS_AND_CONDITIONS_REQUESTED,
      getLatestTermsAndConditionsRequested
    ),
    takeLatest(
      GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_REQUESTED,
      getLatestAcceptedTermsAndConditionsRequested
    ),
    takeLatest(
      ACCEPT_TERMS_AND_CONDITIONS_REQUESTED,
      acceptTermsAndConditionsRequested
    )
  ]);
}
