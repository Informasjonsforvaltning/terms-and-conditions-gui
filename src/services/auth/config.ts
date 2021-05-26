import type { UserManagerSettings } from 'oidc-client';

import env from '../../env';

const { OIDC_ISSUER, FDK_REGISTRATION_BASE_URI } = env;

const userManagerSettings: UserManagerSettings = {
  authority: OIDC_ISSUER,
  client_id: 'terms-and-conditions-gui',
  redirect_uri: `${location.origin}/auth`,
  post_logout_redirect_uri: FDK_REGISTRATION_BASE_URI,
  response_type: 'code',
  scope: 'openid authorities profile email',
  revokeAccessTokenOnSignout: true
};

export default userManagerSettings;
