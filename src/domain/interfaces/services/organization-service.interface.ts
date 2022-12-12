import OrganizationEntity from '@/domain/entities/organization.entity';

interface OrganizationServiceInterface {
  new(),
  getOrganizationById(organizationId: string): Promise<OrganizationEntity>;
  getOrganization(organizationName: string, startDate: Date, endDate: Date): OrganizationEntity;
}

export default OrganizationServiceInterface;
