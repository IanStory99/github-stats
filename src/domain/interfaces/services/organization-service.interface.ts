import { OrganizationInputDto } from '@/application/dtos';
import OrganizationTeamInputDto from '@/application/dtos/organizationteam-input.dto';
import OrganizationEntity from '@/domain/entities/organization.entity';

interface OrganizationServiceInterface {
  getOrganizationById(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity>;
  getOrganizationByIdFilteredByTeamSlug(organizationTeamDTO: OrganizationTeamInputDto): Promise<OrganizationEntity>;
}

export default OrganizationServiceInterface;
