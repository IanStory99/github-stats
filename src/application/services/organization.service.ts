/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrganizationServiceInterface } from "@/domain/interfaces/services";

class OrganizationService implements OrganizationServiceInterface {
  // @ts-ignore
  getOrganization(organizationId: string) {
    // ...
  }

  // @ts-ignore
  getUserOrganizations(username: string) {
    // ...
  }
}

export default OrganizationService;
