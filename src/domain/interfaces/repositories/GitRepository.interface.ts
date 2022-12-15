import { OrganizationEntity } from "@/domain/entities";

interface GitRepositoryInterface {
  getOrganizationById(organizationId: string): Promise<OrganizationEntity>;
}

export default GitRepositoryInterface;
