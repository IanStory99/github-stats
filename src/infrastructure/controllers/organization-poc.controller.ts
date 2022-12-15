import { OrganizationPOCUseCase } from "@/application/use-cases";
import OrganizationOutputDTO from "@/application/dtos/organization-output.dto";

// POC: Prueba de concepto
class OrganizationPOCController {

    private useCase: OrganizationPOCUseCase;

    constructor() {
        this.useCase = new OrganizationPOCUseCase();
    }

    public async execute(organizationId: string): Promise<OrganizationOutputDTO> {
        const result = await this.useCase.execute(organizationId);
        return result;
    }
}

export default OrganizationPOCController;