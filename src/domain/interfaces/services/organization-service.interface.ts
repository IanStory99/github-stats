import OrganizationEntity from '@/domain/entities/organization.entity';

interface OrganizationServiceInterface {
  new();
  getOrganization(organizationId: string, startDate: Date, endDate: Date): OrganizationEntity;
  getUserOrganizations(username: string, startDate: Date, endDate: Date): OrganizationEntity[];
}

export default OrganizationServiceInterface;
