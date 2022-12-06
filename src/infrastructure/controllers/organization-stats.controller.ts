import { OrganizationService, UserStatisticsService, FormattingService } from "@/application/services";
import { GetOrganizationStatsUseCase } from "@/application/use-cases";
import { OrganizationInputDto } from "@/domain/dtos";

class OrganizationStatsController {
  private useCase: GetOrganizationStatsUseCase;

  constructor(useCase: typeof GetOrganizationStatsUseCase) {
    this.useCase = new useCase(
      OrganizationService,
      UserStatisticsService,
      FormattingService
    );
  }

  execute(organizationName: string, startDate: Date, endDate: Date) {
    const organizationInputDto = new OrganizationInputDto();
    organizationInputDto.name = organizationName;
    organizationInputDto.startDate = startDate;
    organizationInputDto.endDate = endDate;
    return this.useCase.execute(organizationInputDto);
  }

}

export default OrganizationStatsController;