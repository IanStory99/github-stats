import { OrganizationService, UserStatisticsService, FormattingService } from "@/domain/services";
import { GetUserStatsUseCase } from "@/application/use-cases";
import { UserInputDto } from "@/application/dtos";

class UserStatsController {
  private useCase: GetUserStatsUseCase;

  constructor(useCase: typeof GetUserStatsUseCase) {
    this.useCase = new useCase(
      OrganizationService,
      UserStatisticsService,
      FormattingService
    );
  }

  execute(username: string, startDate: Date, endDate: Date) {
    const userInputDto = new UserInputDto();
    userInputDto.username = username;
    userInputDto.startDate = startDate;
    userInputDto.endDate = endDate;
    return this.useCase.execute(userInputDto);
  }

}

export default UserStatsController;