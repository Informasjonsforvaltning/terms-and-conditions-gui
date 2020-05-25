import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import parse from 'html-react-parser';

import env from '../../env';

import { withAuth, Props as AuthProps } from '../../providers/auth';

import withTermsAndConditions, {
  Props as TermsAndConditionsProps
} from '../with-terms-and-conditions';

import Breadcrumbs from '../breadcrumbs';
import Button from '../button';
import Checkbox from '../checkbox';
import { Variant } from '../banner';
import AbsoluteRedirect from '../absolute-redirect';

import { dateStringToDate, formatDate } from '../../utils/date-utils';

import SC from './styled';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
}

interface Props
  extends AuthProps,
    TermsAndConditionsProps,
    RouteComponentProps<RouteParams> {}

const TermsAndConditionsPage: FC<Props> = ({
  authService,
  termsAndConditions,
  acceptation,
  match: {
    params: { organizationId }
  },
  termsAndConditionsActions: {
    getLatestTermsAndConditionsRequested: getLatestTermsAndConditions,
    getLatestAcceptedTermsAndConditionsRequested: getLatestAcceptedTermsAndConditions,
    acceptTermsAndConditionsRequested: acceptTermsAndConditions
  }
}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdminUser = authService.hasOrganizationAdminPermission(
    organizationId
  );
  const latestTermsAccepted = authService.hasAcceptedLatestTermsAndConditions(
    organizationId
  );

  const hasOrganisationAccess =
    authService.hasOrganizationReadPermission(organizationId) ||
    authService.hasOrganizationWritePermission(organizationId) ||
    authService.hasOrganizationAdminPermission(organizationId);

  const acceptorName =
    authService.getUser()?.name === acceptation?.acceptorName
      ? 'Du'
      : acceptation?.acceptorName;
  const acceptDate = formatDate(
    dateStringToDate(acceptation?.acceptDate ?? '')
  );

  const toggleCheckbox = () => setIsCheckboxChecked(!isCheckboxChecked);
  const accept = () => {
    setIsSubmitting(true);
    acceptTermsAndConditions(
      {
        orgId: organizationId,
        acceptorName: authService.getUser()?.name ?? '',
        acceptDate: new Date().toISOString(),
        acceptedVersion: termsAndConditions?.version ?? 'latest'
      },
      () => location.assign(FDK_REGISTRATION_BASE_URI)
    );
  };

  useEffect(() => {
    getLatestTermsAndConditions();
    getLatestAcceptedTermsAndConditions(organizationId);
  }, []);

  return hasOrganisationAccess ? (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            title: 'Alle kataloger',
            url: FDK_REGISTRATION_BASE_URI,
            external: true
          },
          { title: 'Vilkår og betingelser', current: true }
        ]}
      />
      <SC.Container>
        <SC.Title>Bruksvilkår for registrering i Felles datakatalog</SC.Title>
        {latestTermsAccepted && (
          <SC.Banner variant={Variant.SUCCESS}>
            {acceptorName} aksepterte bruksvilkår på vegne av din virksomhet
            {acceptDate && ` ${acceptDate}`}. Dersom din virksomhet ikke ønsker
            oppføring i Felles datakatalog må du ta kontakt med forvalter av
            katalogen på{' '}
            <a href='mailto:fellesdatakatalog@digdir.no'>
              fellesdatakatalog@digdir.no
            </a>
          </SC.Banner>
        )}
        <SC.TermsAndConditions>
          {parse(termsAndConditions?.text ?? '')}
        </SC.TermsAndConditions>
        {isAdminUser && (
          <SC.Agreement>
            <Checkbox
              name='terms-and-conditions'
              checked={isCheckboxChecked}
              disabled={latestTermsAccepted || isSubmitting}
              onChange={toggleCheckbox}
            >
              Som bemyndiget person aksepterer jeg bruksvilkår for Felles
              datakatalog på vegne av virksomheten.
            </Checkbox>
            <SC.ButtonGroup>
              <Button
                disabled={
                  !isCheckboxChecked || latestTermsAccepted || isSubmitting
                }
                onClick={accept}
              >
                Aksepter bruksvilkår
              </Button>
            </SC.ButtonGroup>
            {!latestTermsAccepted && (
              <SC.Banner variant={Variant.WARNING}>
                Det kan ikke opprettes kataloger for din virksomhet derson
                vilkår og betingelser ikke godtas.
              </SC.Banner>
            )}
          </SC.Agreement>
        )}
      </SC.Container>
    </>
  ) : (
    <AbsoluteRedirect to={FDK_REGISTRATION_BASE_URI} />
  );
};

export default compose<FC>(
  memo,
  withAuth,
  withRouter,
  withTermsAndConditions
)(TermsAndConditionsPage);
