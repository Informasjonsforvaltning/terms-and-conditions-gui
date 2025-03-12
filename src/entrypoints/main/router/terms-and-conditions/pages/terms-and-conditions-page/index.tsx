import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { Link as RouteLink, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Link from '@fellesdatakatalog/link';
import Breadcrumbs, { Breadcrumb } from '@fellesdatakatalog/breadcrumbs';
import { Severity } from '@fellesdatakatalog/alert';
import Button from '@fellesdatakatalog/button';

import env from '../../../../../../env';

import { withAuth } from '../../../../../../providers/auth';
import { authService } from '../../../../../../services/auth/auth-service';

import withTermsAndConditions, {
  Props as TermsAndConditionsProps
} from '../../../../../../components/with-terms-and-conditions';

import Checkbox from '../../../../../../components/checkbox';
import AbsoluteRedirect from '../../../../../../components/absolute-redirect';

import {
  dateStringToDate,
  formatDate
} from '../../../../../../utils/date-utils';

import SC from './styled';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
}

interface Props extends TermsAndConditionsProps {}

const TermsAndConditionsPage: FC<Props> = ({
  termsAndConditions,
  acceptation,
  termsAndConditionsActions: {
    getLatestTermsAndConditionsRequested: getLatestTermsAndConditions,
    getLatestAcceptedTermsAndConditionsRequested:
      getLatestAcceptedTermsAndConditions,
    acceptTermsAndConditionsRequested: acceptTermsAndConditions
  }
}) => {
  const { organizationId } = useParams<RouteParams>();

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasAdminAccess =
    authService.hasOrganizationAdminPermission(organizationId);
  const latestTermsAccepted =
    authService.hasAcceptedLatestTermsAndConditions(organizationId);

  const hasReadAccess =
    authService.hasOrganizationReadPermission(organizationId);

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

  return hasReadAccess ? (
    <>
      <Breadcrumbs as={SC.Breadcrumbs}>
        <Breadcrumb>
          <Link to={FDK_REGISTRATION_BASE_URI} as={RouteLink}>
            Alle kataloger
          </Link>
        </Breadcrumb>
        <Breadcrumb active>Vilkår og betingelser</Breadcrumb>
      </Breadcrumbs>
      <SC.Page>
        <SC.Title>Bruksvilkår for registrering i Felles datakatalog</SC.Title>
        {latestTermsAccepted && (
          <SC.Alert severity={Severity.SUCCESS}>
            <div>
              {acceptorName} aksepterte bruksvilkår på vegne av din virksomhet
              {acceptDate && ` ${acceptDate}`}. Dersom din virksomhet ikke
              ønsker oppføring i Felles datakatalog må du ta kontakt med
              forvalter av katalogen på{' '}
              <Link href='mailto:fellesdatakatalog@digdir.no'>
                fellesdatakatalog@digdir.no
              </Link>
            </div>
          </SC.Alert>
        )}
        {!hasAdminAccess && !latestTermsAccepted && (
          <SC.Alert severity={Severity.WARNING}>
            <div>
              Du må ha rollen <i>Virksomhetsadministrator</i> for å kunne
              akseptere bruksvilkår på vegne av virksomheten.
            </div>
          </SC.Alert>
        )}
        <SC.TermsAndConditions>
          {parse(termsAndConditions?.text ?? '')}
        </SC.TermsAndConditions>
        {hasAdminAccess && (
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
              <SC.Alert severity={Severity.WARNING}>
                <div>
                  Det kan ikke opprettes kataloger for din virksomhet dersom
                  vilkår og betingelser ikke godtas.
                </div>
              </SC.Alert>
            )}
          </SC.Agreement>
        )}
      </SC.Page>
    </>
  ) : (
    <AbsoluteRedirect to={FDK_REGISTRATION_BASE_URI} />
  );
};

export default compose<FC>(
  memo,
  withAuth,
  withTermsAndConditions
)(TermsAndConditionsPage);
