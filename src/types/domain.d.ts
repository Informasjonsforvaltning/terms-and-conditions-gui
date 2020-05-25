export interface TermsAndConditions {
  version: string;
  text: string;
}

export interface Acceptation {
  orgId: string;
  acceptedVersion: string;
  acceptorName: string;
  acceptDate: string;
}
