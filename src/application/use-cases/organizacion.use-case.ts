/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrganizationServiceInterface } from "@/domain/interfaces/services";
import { OrganizationService } from "@/domain/services";

class OrganizationPOCUseCase {

    private organizationService: OrganizationServiceInterface;

    constructor() {
        // @ts-ignore
        this.organizationService = new OrganizationService();
    }

    async execute(organizationDTO): Promise<any> { // TODO - Devolver OrganizationDTO formatteado
        const result = await this.organizationService.findById(organizationDTO);
        return result;
    }
}

export default OrganizationPOCUseCase;