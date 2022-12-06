import { OrganizationServiceInterface } from "@/domain/interfaces/services";

class OrganizationService implements OrganizationServiceInterface {
  getOrganization(organizationId: string) {
    // ...
  }

  getUserOrganizations(username: string) {
    // ...
  }
}

export default OrganizationService;
