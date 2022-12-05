import GetUserStatsUseCase from "@/application/use-cases/get-user-stats.use-case";
import { OrganizationService, UserStatisticsService, FormattingService } from "@/application/services";

class UserStatsController {
  private useCase: GetUserStatsUseCase;

  constructor(useCase: typeof GetUserStatsUseCase) {
    this.useCase = new useCase(
      OrganizationService,
      UserStatisticsService,
      FormattingService
    );
  }

  getUserStats(username: string) {
    this.useCase.execute(username);
  }

}

export default UserStatsController;