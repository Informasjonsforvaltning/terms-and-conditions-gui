import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_LATEST_TERMS_AND_CONDITIONS_SUCCEEDED,
  GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_SUCCEEDED,
  ACCEPT_TERMS_AND_CONDITIONS_SUCCEEDED
} from './action-types';

import type { Acceptation, Actions, TermsAndConditions } from '../../../types';

const initialState = fromJS({
  termsAndConditions: {} as TermsAndConditions,
  acceptation: {} as Acceptation
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_LATEST_TERMS_AND_CONDITIONS_SUCCEEDED:
      return state.set(
        'termsAndConditions',
        fromJS(action.payload.termsAndConditions)
      );
    case GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_SUCCEEDED:
      return state.set('acceptation', fromJS(action.payload.acceptation));
    case ACCEPT_TERMS_AND_CONDITIONS_SUCCEEDED:
      return state.set('acceptation', fromJS(action.payload.acceptation));
    default:
      return state;
  }
}
