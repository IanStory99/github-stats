import OrganizationEntity from '@/domain/entities/organization.entity';
import { GitRepositoryInterface } from "@/domain/interfaces/repositories";

interface OrganizationServiceInterface {
  new(repository: GitRepositoryInterface),
  getOrganizationById(organizationId: string): Promise<OrganizationEntity>;
  getOrganization(organizationName: string, startDate: Date, endDate: Date): OrganizationEntity;
}

export default OrganizationServiceInterface;
