import { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  OIDC_ISSUER: string;
  FDK_REGISTRATION_BASE_URI: string;
  TERMS_AND_CONDITIONS_HOST: string;
  SEARCH_HOST: string;
  ADMIN_GUI_HOST: string;
}
