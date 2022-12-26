import { OrganizationEntity } from "@/domain/entities";
import { OrganizationRepositoryInterface } from "@/domain/interfaces/repositories";

interface LocalOrganizationRepositoryInterface extends OrganizationRepositoryInterface {
  persist(organization: OrganizationEntity): Promise<void>;
}

export default LocalOrganizationRepositoryInterface;
