import type { Namespace } from './enums';

export interface EnvironmentVariables {
  NAMESPACE: Namespace;
  OIDC_ISSUER: string;
  FDK_REGISTRATION_BASE_URI: string;
  TERMS_AND_CONDITIONS_HOST: string;
  SEARCH_HOST: string;
  ADMIN_GUI_HOST: string;
  SKE_THEME_PROFILE: string;
  CATALOG_ADMIN_BASE_URI: string;
}
