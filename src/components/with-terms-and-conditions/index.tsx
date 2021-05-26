import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import type { TermsAndConditions, Acceptation } from '../../types';

export interface Props {
  termsAndConditions?: TermsAndConditions;
  acceptation?: Acceptation;
  termsAndConditionsActions: typeof actions;
}

const withDataService = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: any) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    termsAndConditions:
      state.TermsAndConditionsReducer.get('termsAndConditions')?.toJS() ??
      undefined,
    acceptation:
      state.TermsAndConditionsReducer.get('acceptation')?.toJS() ?? undefined
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    termsAndConditionsActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDataService;
