import { OrganizationInputDto } from '@/application/dtos';
import OrganizationEntity from '@/domain/entities/organization.entity';

interface OrganizationServiceInterface {
  getOrganizationById(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity>;
}

export default OrganizationServiceInterface;
