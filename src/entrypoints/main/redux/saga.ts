import { all } from 'redux-saga/effects';

import termsAndConditionsSaga from '../../../components/with-terms-and-conditions/redux/saga';

export default function* saga() {
  yield all([termsAndConditionsSaga()]);
}
