import {
  GET_LATEST_TERMS_AND_CONDITIONS_REQUESTED,
  GET_LATEST_TERMS_AND_CONDITIONS_SUCCEEDED,
  GET_LATEST_TERMS_AND_CONDITIONS_FAILED,
  GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_REQUESTED,
  GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_SUCCEEDED,
  GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_FAILED,
  ACCEPT_TERMS_AND_CONDITIONS_REQUESTED,
  ACCEPT_TERMS_AND_CONDITIONS_SUCCEEDED,
  ACCEPT_TERMS_AND_CONDITIONS_FAILED
} from './action-types';

import type { TermsAndConditions, Acceptation } from '../../../types';

export function getLatestTermsAndConditionsRequested() {
  return {
    type: GET_LATEST_TERMS_AND_CONDITIONS_REQUESTED
  };
}

export function getLatestTermsAndConditionsSucceeded(
  termsAndConditions: TermsAndConditions
) {
  return {
    type: GET_LATEST_TERMS_AND_CONDITIONS_SUCCEEDED,
    payload: {
      termsAndConditions
    }
  };
}

export function getLatestTermsAndConditionsFailed(message: string) {
  return {
    type: GET_LATEST_TERMS_AND_CONDITIONS_FAILED,
    payload: {
      message
    }
  };
}

export function getLatestAcceptedTermsAndConditionsRequested(
  organizationId: string
) {
  return {
    type: GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_REQUESTED,
    payload: {
      organizationId
    }
  };
}

export function getLatestAcceptedTermsAndConditionsSucceeded(
  acceptation: Acceptation
) {
  return {
    type: GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_SUCCEEDED,
    payload: {
      acceptation
    }
  };
}

export function getLatestAcceptedTermsAndConditionsFailed(message: string) {
  return {
    type: GET_LATEST_ACCEPTED_TERMS_AND_CONDITIONS_FAILED,
    payload: {
      message
    }
  };
}

export function acceptTermsAndConditionsRequested(
  acceptation: Acceptation,
  onSuccess?: () => void
) {
  return {
    type: ACCEPT_TERMS_AND_CONDITIONS_REQUESTED,
    payload: {
      acceptation,
      onSuccess
    }
  };
}

export function acceptTermsAndConditionsSucceeded(acceptation: Acceptation) {
  return {
    type: ACCEPT_TERMS_AND_CONDITIONS_SUCCEEDED,
    payload: {
      acceptation
    }
  };
}

export function acceptTermsAndConditionsFailed(message: string) {
  return {
    type: ACCEPT_TERMS_AND_CONDITIONS_FAILED,
    payload: {
      message
    }
  };
}
