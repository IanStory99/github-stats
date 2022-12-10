import { OrganizationEntity } from "@/domain/entities";

export interface GitRepositoryInterface {
    getOrganizationById(organizationId: string): Promise<OrganizationEntity>;
}