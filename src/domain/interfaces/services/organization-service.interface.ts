import OrganizationEntity from '@/domain/entities/organization.entity';

interface OrganizationServiceInterface {
  getOrganizationById(organizationId: string): Promise<OrganizationEntity>;
}

export default OrganizationServiceInterface;
