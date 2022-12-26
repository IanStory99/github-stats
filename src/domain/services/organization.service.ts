/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrganizationInputDto } from "@/application/dtos";
import OrganizationTeamInputDto from "@/application/dtos/organizationteam-input.dto";
import { OrganizationEntity } from "@/domain/entities";
import { GitRepositoryInterface } from "@/domain/interfaces/repositories";
import { OrganizationServiceInterface } from "@/domain/interfaces/services";

class OrganizationService implements OrganizationServiceInterface {

  private repository: GitRepositoryInterface;

  constructor(repository: GitRepositoryInterface) {
    this.repository = repository;
  }

  public async getOrganizationById(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity> {
    const organization = await this.repository.getOrganizationById(organizationDTO);
    return organization;
  }

  public async getOrganizationByIdFilteredByTeamSlug(organizationTeamDTO: OrganizationTeamInputDto): Promise<OrganizationEntity> {
    const organization = await this.repository.getOrganizationByIdFilteredByTeamSlug(organizationTeamDTO);
    return organization;
  }
}

export default OrganizationService;
