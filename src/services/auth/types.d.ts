import { Resource, Role } from './enums';

export interface ResourceRole {
  resource: Resource;
  resourceId: string;
  role: Role;
}

export interface OrganizationRole {
  orgNr: string;
  role: string;
}

export interface AuthConfig {
  oidcIssuer: string;
  clientId: string;
  redirectUri: string;
  logoutRedirectUri: string;
  silentCheckSsoRedirectUri?: string;
}

export interface User {
  username: string;
  name: string;
}
