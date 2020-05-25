import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { TermsAndConditions, Acceptation } from '../../types';

export interface Props {
  termsAndConditions: TermsAndConditions | null;
  acceptation: Acceptation | null;
  termsAndConditionsActions: typeof actions;
}

const withDataService = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: any) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    termsAndConditions:
      state.TermsAndConditionsReducer.get('termsAndConditions')?.toJS() ?? null,
    acceptation:
      state.TermsAndConditionsReducer.get('acceptation')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    termsAndConditionsActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDataService;
