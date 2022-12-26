/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrganizationEntity } from "@/domain/entities";
import { OrganizationRepositoryInterface } from "@/domain/interfaces/repositories";
import { OrganizationServiceInterface } from "@/domain/interfaces/services";
import { PrismaLocalOrganizationRepository } from "@/infrastructure/repositories";

// @ts-ignore
class OrganizationService implements OrganizationServiceInterface {

  private repository: OrganizationRepositoryInterface;

  constructor(repository: OrganizationRepositoryInterface) {
    this.repository = repository;
  }

  public async findById(organizationDTO): Promise<OrganizationEntity> {
    const organization = await this.repository.findById(organizationDTO);

    // TODO: REMOVER!!!
    console.log(organization.getTeams().map((team) => team.getMembers()));
    const pepe = new PrismaLocalOrganizationRepository();
    await pepe.persist(organization);

    return organization;
  }

}

export default OrganizationService;
