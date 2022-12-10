import { OrganizationServiceInterface } from "@/domain/interfaces/services";
import { OrganizationService } from "@/application/services";

class OrganizationPOCUseCase {

    private organizationService: OrganizationServiceInterface;

    constructor() {
        this.organizationService = new OrganizationService();
    }

    async execute(organizationId: string): Promise<any> { // TODO - Devolver OrganizationDTO formatteado
        const result = await this.organizationService.getOrganizationById(organizationId);
        return result;
    }
}

export default OrganizationPOCUseCase;