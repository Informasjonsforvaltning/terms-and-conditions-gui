import { EnvironmentVariables } from './types';
import { Environment } from './types/enums';

function assertIsDefined<T>(
  key: string,
  value: T
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected ${key} to be defined, but received ${value}`);
  }
}

const env: EnvironmentVariables = (window as any).env || {
  ENV: Environment.DEVELOPMENT,
  OIDC_ISSUER:
    'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
  FDK_REGISTRATION_BASE_URI:
    'https://registrering.staging.fellesdatakatalog.digdir.no',
  TERMS_AND_CONDITIONS_HOST:
    'https://terms.staging.fellesdatakatalog.digdir.no',
  SEARCH_HOST: 'https://staging.fellesdatakatalog.digdir.no',
  ADMIN_GUI_HOST: 'https://admin.staging.fellesdatakatalog.digdir.no'
};

Object.entries(env).forEach(([key, value]) => assertIsDefined(key, value));

export default env;
