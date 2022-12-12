/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrganizationEntity } from "@/domain/entities";
import { GitRepositoryInterface } from "@/domain/interfaces/repositories/GitRepository.interface";
import { OrganizationServiceInterface } from "@/domain/interfaces/services";
import { GithubRepository } from "@/infrastructure/repositories/github.repository";

// @ts-ignore
class OrganizationService implements OrganizationServiceInterface {

  private repository: GitRepositoryInterface;

  constructor() {
    this.repository = new GithubRepository();
  }

  public async getOrganizationById(organizationId: string): Promise<OrganizationEntity> {
    const organization = await this.repository.getOrganizationById(organizationId);
    return organization;
  }

}

export default OrganizationService;
