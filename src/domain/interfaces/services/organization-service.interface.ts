import OrganizationEntity from '@/domain/entities/organization.entity';
import { GitRepositoryInterface } from "@/domain/interfaces/repositories";

interface OrganizationServiceInterface {
  new(repository: GitRepositoryInterface),
  getOrganizationById(organizationDTO): Promise<OrganizationEntity>;
}

export default OrganizationServiceInterface;
