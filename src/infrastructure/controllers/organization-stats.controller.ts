/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  OrganizationService,
  UserStatisticsService,
  FormattingService
} from "@/domain/services";
import { validateOrReject } from "class-validator";
import { GetOrganizationStatsUseCase } from "@/application/use-cases";
import { OrganizationInputDto } from "@/application/dtos";
import { ErrorException } from "@/domain/exceptions";
import { GithubOrganizationRepository } from "@/infrastructure/repositories";
import {
  CSVFormatter,
  AverageCommentLengthStatisticsEntity,
  CommitCountStatisticsEntity,
  CodeDiffCountStatisticsEntity,
  ExecutedPRCountStatisticsEntity,
  ReviewedPRCountStatisticsEntity,
} from "@/domain/entities";

class OrganizationStatsController {
  private useCase: GetOrganizationStatsUseCase;

  constructor() {
    this.useCase = new GetOrganizationStatsUseCase(
      // @ts-ignore
      new OrganizationService(new GithubOrganizationRepository()),
      new UserStatisticsService([
        new AverageCommentLengthStatisticsEntity(),
        new CommitCountStatisticsEntity(),
        new CodeDiffCountStatisticsEntity(),
        new ExecutedPRCountStatisticsEntity(),
        new ReviewedPRCountStatisticsEntity()
      ]),
      new FormattingService(new CSVFormatter())
    );
  }

  async execute(organizationName: string, startDate: Date, endDate: Date, savePath: string) {
    const organizationInputDto = new OrganizationInputDto();
    organizationInputDto.name = organizationName;
    organizationInputDto.startDate = startDate;
    organizationInputDto.endDate = endDate;
    organizationInputDto.savePath = savePath;
    try {
      await validateOrReject(organizationInputDto);
    } catch (errors) {
      throw new ErrorException(400, Object.values(errors[0].constraints).join("; "));
    }
    await this.useCase.execute(organizationInputDto);
  }

}

export default OrganizationStatsController;