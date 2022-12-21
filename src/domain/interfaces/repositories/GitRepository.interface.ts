import { OrganizationEntity } from "@/domain/entities";

interface GitRepositoryInterface {
  getOrganizationById(organizationDTO): Promise<OrganizationEntity>;
}

export default GitRepositoryInterface;
