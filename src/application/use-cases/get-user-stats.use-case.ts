import {
  CSVFormatter,
  AverageCommentLengthStatisticsEntity,
  CommitCountStatisticsEntity,
  CodeDiffCountStatisticsEntity,
  ExecutedPRCountStatisticsEntity,
  ReviewedPRCountStatisticsEntity,
} from "@/domain/entities";
import {
  OrganizationServiceInterface,
  UserStatisticsServiceInterface,
  FormattingServiceInterface
} from "@/domain/interfaces/services";

class GetUserStatsUseCase {
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

  execute(username: string) {
    const organizations = this.organizationService.getUserOrganizations(username);
    const userStatistics = this.userStatisticsService.getUserOrganizationsStatistics(
      username,
      organizations
    );
    const formattedStatistics = this.formattingService.format(
      userStatistics.toJSON()
    );

    return formattedStatistics;
  }

}

export default GetUserStatsUseCase;
