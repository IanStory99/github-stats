import { OrganizationEntity } from "@/domain/entities";
import { OrganizationInputDto } from "@/application/dtos";

interface OrganizationRepositoryInterface {
  findById(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity>;
  getOrganizationByIdFilteredByTeamSlug(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity>;
}

export default OrganizationRepositoryInterface;
