import { OrganizationEntity, UserStatisticsEntity } from "@/domain/entities";
import {
  CSVFormatter,
  AverageCommentLengthStatisticsEntity,
  CommitCountStatisticsEntity,
  CodeDiffCountStatisticsEntity,
  ExecutedPRCountStatisticsEntity,
  ReviewedPRCountStatisticsEntity,
} from "@/domain/entities";
import {
  OrganizationInputDto
} from "@/domain/dtos";
import {
  OrganizationServiceInterface,
  UserStatisticsServiceInterface,
  FormattingServiceInterface
} from "@/domain/interfaces/services";

class GetOrganizationStatsUseCase {
  private organizationService: OrganizationServiceInterface;
  private userStatisticsService: UserStatisticsServiceInterface;
  private formattingService: FormattingServiceInterface;

  constructor(
    organizationService: OrganizationServiceInterface,
    userStatisticsService: UserStatisticsServiceInterface,
    formattingService: FormattingServiceInterface
  ) {
    this.organizationService = new organizationService();
    this.userStatisticsService = new userStatisticsService([
      new AverageCommentLengthStatisticsEntity(),
      new CommitCountStatisticsEntity(),
      new CodeDiffCountStatisticsEntity(),
      new ExecutedPRCountStatisticsEntity(),
      new ReviewedPRCountStatisticsEntity()
    ]);
    this.formattingService = new formattingService(
      new CSVFormatter()
    );
  }

  execute(organizationInputDto: OrganizationInputDto) {
    const organization = this.organizationService.getOrganization(
      organizationInputDto.name,
      organizationInputDto.startDate,
      organizationInputDto.endDate
    );
    const organizationUsersStatistics = this.userStatisticsService.getOrganizationUsersStatistics(
      organization
    );
    const statsJSON = this.buildStatsJSON(organization, organizationUsersStatistics);
    const formattedStatistics = this.formattingService.format(statsJSON);
    formattedStatistics.saveToFile();

    return formattedStatistics;
  }

  private buildStatsJSON(organization: OrganizationEntity, organizationUsersStatistics: UserStatisticsEntity[]): object {
    const statsJSON = [];
    for (const team of organization.getTeams()) {
      for (const user of team.getMembers()) {
        const userStatistics = organizationUsersStatistics.find(
          (userStatistics) => userStatistics.getUserId() === user.getId()
        );
        statsJSON.push({
          username: user.getLogin(),
          team: team.getName(),
          stats: userStatistics.getStatistics()
        });
      }
    }
    return statsJSON;
  }
}

export default GetOrganizationStatsUseCase;
