/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrganizationEntity } from "@/domain/entities";
import { OrganizationRepositoryInterface } from "@/domain/interfaces/repositories";
import { OrganizationServiceInterface } from "@/domain/interfaces/services";

// @ts-ignore
class OrganizationService implements OrganizationServiceInterface {

  private repository: OrganizationRepositoryInterface;

  constructor(repository: OrganizationRepositoryInterface) {
    this.repository = repository;
  }

  public async findById(organizationDTO): Promise<OrganizationEntity> {
    const organization = await this.repository.findById(organizationDTO);
    return organization;
  }

}

export default OrganizationService;
