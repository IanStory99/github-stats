import {
  CSVFormatter,
  AverageCommentLengthStatisticsEntity,
  CommitCountStatisticsEntity,
  CodeDiffCountStatisticsEntity,
  ExecutedPRCountStatisticsEntity,
  ReviewedPRCountStatisticsEntity,
} from "@/domain/entities";
import {
  UserInputDto
} from "@/domain/dtos";
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

  execute(userInputDto: UserInputDto) {
    const organizations = this.organizationService.getUserOrganizations(
      userInputDto.username,
      userInputDto.startDate,
      userInputDto.endDate
    );
    const userStatistics = this.userStatisticsService.getUserOrganizationsStatistics(
      userInputDto.username,
      organizations
    );
    const formattedStatistics = this.formattingService.format(
      userStatistics.toJSON()
    );

    return formattedStatistics;
  }

}

export default GetUserStatsUseCase;
