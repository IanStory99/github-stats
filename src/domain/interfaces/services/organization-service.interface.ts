import OrganizationEntity from '@/domain/entities/organization.entity';

interface OrganizationServiceInterface {
  new();
  getOrganization(organizationId: string): OrganizationEntity;
  getUserOrganizations(username: string): OrganizationEntity[];
}

export default OrganizationServiceInterface;
