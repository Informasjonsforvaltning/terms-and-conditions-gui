import { validateEnv } from './utils/common';

import { Namespace } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    NAMESPACE: Namespace.DEVELOPMENT,
    OIDC_ISSUER:
      'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    TERMS_AND_CONDITIONS_HOST:
      'https://terms.staging.fellesdatakatalog.digdir.no',
    SEARCH_HOST: 'https://staging.fellesdatakatalog.digdir.no',
    ADMIN_GUI_HOST: 'https://admin.staging.fellesdatakatalog.digdir.no',
    SKE_THEME_PROFILE: '910244132'
  }
);
