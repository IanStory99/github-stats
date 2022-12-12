/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  // OrganizationService, // TODO: Uncomment this line
  MockOrganizationService as OrganizationService,
  UserStatisticsService,
  FormattingService
} from "@/application/services";
import { GetOrganizationStatsUseCase } from "@/application/use-cases";
import { OrganizationInputDto } from "@/domain/dtos";

class OrganizationStatsController {
  private useCase: GetOrganizationStatsUseCase;

  constructor() {
    this.useCase = new GetOrganizationStatsUseCase(
      // @ts-ignore
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
    this.useCase.execute(organizationInputDto);
  }

}

export default OrganizationStatsController;