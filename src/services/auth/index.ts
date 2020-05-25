import Keycloak, { KeycloakInstance } from 'keycloak-js';

import config from './config';

import { AuthConfig, User, ResourceRole } from './types';
import { Resource, Role } from './enums';

class AuthService {
  private readonly kc: KeycloakInstance;

  constructor(private readonly configuration: AuthConfig = config) {
    const { oidcIssuer, clientId } = configuration;
    const [url, realm] = oidcIssuer.split('/realms/');

    this.kc = Keycloak({ realm, url, clientId });
  }

  public async init(loginRequired?: boolean): Promise<boolean> {
    try {
      const { silentCheckSsoRedirectUri } = this.configuration;
      await this.kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri
      });
    } catch (error) {
      console.error(error);
    }

    if (!!loginRequired && !this.isAuthenticated()) {
      await this.login();
    }

    return this.isAuthenticated();
  }

  public async login(): Promise<void> {
    try {
      await this.kc.login();
    } catch (error) {
      console.error(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.kc.logout({
        redirectUri: this.configuration.logoutRedirectUri
      });
    } catch (error) {
      console.error(error);
    }
  }

  public isAuthenticated(): boolean {
    return !!this.kc.authenticated;
  }

  public getUser(): User | null {
    const { user_name: username, name } = (this.kc.tokenParsed as any) ?? {};
    return this.kc.tokenParsed ? { username, name } : null;
  }

  public async getToken(): Promise<KeycloakInstance['token']> {
    try {
      await this.kc.updateToken(30);
    } catch (error) {
      await this.logout();
    }

    return this.kc.token;
  }

  public async getAuthorizationHeader(): Promise<string> {
    return `Bearer ${await this.getToken()}`;
  }

  public getAuthorities(): string[] {
    const { authorities } = (this.kc.tokenParsed as any) ?? {};
    return authorities?.split(',') ?? [];
  }

  public getResourceRoles(): ResourceRole[] {
    return this.getAuthorities()
      .map(authority => authority.split(':'))
      .map(([resource, resourceId, role]) => ({
        resource: resource as Resource,
        resourceId,
        role: role as Role
      }));
  }

  public hasResourceRole(
    resource: Resource,
    resourceId: string,
    role: Role
  ): boolean {
    return this.getResourceRoles().some(
      r =>
        r.resource === resource &&
        r.resourceId === resourceId &&
        r.role === role
    );
  }

  public hasOrganizationRole(organizationNumber: string, role: Role): boolean {
    return this.hasResourceRole(
      Resource.ORGANIZATION,
      organizationNumber,
      role
    );
  }

  public hasOrganizationReadPermission(organizationNumber: string): boolean {
    return this.hasOrganizationRole(organizationNumber, Role.READ);
  }

  public hasOrganizationWritePermission(organizationNumber: string): boolean {
    return this.hasOrganizationRole(organizationNumber, Role.ADMIN);
  }

  public hasOrganizationAdminPermission(organizationNumber: string): boolean {
    return this.hasOrganizationRole(organizationNumber, Role.ADMIN);
  }

  public hasSystemAdminPermission(): boolean {
    return this.hasResourceRole(Resource.SYSTEM, 'root', Role.ADMIN);
  }

  public isReadOnlyUser(organizationNumber: string): boolean {
    return (
      this.hasOrganizationReadPermission(organizationNumber) &&
      !(
        this.hasOrganizationWritePermission(organizationNumber) ||
        this.hasOrganizationAdminPermission(organizationNumber) ||
        this.hasSystemAdminPermission()
      )
    );
  }

  public hasAcceptedLatestTermsAndConditions(
    organizationNumber: string
  ): boolean {
    const { fdk_terms: latestVersion, org_terms: terms = '' } =
      (this.kc.tokenParsed as any) ?? {};
    return terms
      .split(',')
      .some((t: string) => t === `${organizationNumber}:${latestVersion}`);
  }
}

export default new AuthService();
