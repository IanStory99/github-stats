import { OrganizationInputDto } from "@/application/dtos";
import OrganizationTeamInputDto from "@/application/dtos/organizationteam-input.dto";
import { OrganizationEntity } from "@/domain/entities";

interface GitRepositoryInterface {
  getOrganizationById(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity>;
  getOrganizationByIdFilteredByTeamSlug(organizationDTO: OrganizationTeamInputDto): Promise<OrganizationEntity>;

}

export default GitRepositoryInterface;
