import { AuthConfig } from './types';

import env from '../../env';

const { OIDC_ISSUER: oidcIssuer } = env;
const { href, origin } = location;

const config: AuthConfig = {
  oidcIssuer,
  clientId: 'terms-and-conditions-gui',
  redirectUri: href,
  logoutRedirectUri: origin,
  silentCheckSsoRedirectUri: `${origin}/terms-and-conditions/auth.html`
};

export default config;
