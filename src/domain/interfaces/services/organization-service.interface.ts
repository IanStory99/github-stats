import OrganizationEntity from '@/domain/entities/organization.entity';
import { OrganizationRepositoryInterface } from "@/domain/interfaces/repositories";

interface OrganizationServiceInterface {
  new(repository: OrganizationRepositoryInterface),
  findById(organizationDTO): Promise<OrganizationEntity>;
}

export default OrganizationServiceInterface;
