/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  OrganizationService,
  UserStatisticsService,
  FormattingService
} from "@/domain/services";
import { validateOrReject } from "class-validator";
import { GetOrganizationTeamStatsUseCase } from "@/application/use-cases";
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
import OrganizationTeamInputDto from "@/application/dtos/organizationteam-input.dto";

class TeamOrganizationStatsController {
  private useCase: GetOrganizationTeamStatsUseCase;

  constructor() {
    this.useCase = new GetOrganizationTeamStatsUseCase(
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

  async execute(organizationName: string, teamSlug: string, startDate: Date, endDate: Date) {
    const organizationTeamInputDto = new OrganizationTeamInputDto();
    organizationTeamInputDto.name = organizationName;
    organizationTeamInputDto.teamSlug = teamSlug;
    organizationTeamInputDto.startDate = startDate;
    organizationTeamInputDto.endDate = endDate;
    try {
      await validateOrReject(organizationTeamInputDto);
    } catch (errors) {
      throw new ErrorException(400, Object.values(errors[0].constraints).join("; "));
    }
    await this.useCase.execute(organizationTeamInputDto);
  }

}

export default TeamOrganizationStatsController;