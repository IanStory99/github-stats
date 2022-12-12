/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  // OrganizationService, // TODO: Uncomment this line
  MockOrganizationService as OrganizationService,
  UserStatisticsService,
  FormattingService
} from "@/application/services";
import { validateOrReject } from "class-validator";
import { GetOrganizationStatsUseCase } from "@/application/use-cases";
import { OrganizationInputDto } from "@/domain/dtos";
import { ErrorException } from "@/domain/exceptions";

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

  async execute(organizationName: string, startDate: Date, endDate: Date) {
    const organizationInputDto = new OrganizationInputDto();
    organizationInputDto.name = organizationName;
    organizationInputDto.startDate = startDate;
    organizationInputDto.endDate = endDate;
    await validateOrReject(organizationInputDto)
      .then(() => {
        this.useCase.execute(organizationInputDto);
      })
      .catch((errors) => {
        throw new ErrorException(400, Object.values(errors[0].constraints).join("; "));
      });
  }

}

export default OrganizationStatsController;