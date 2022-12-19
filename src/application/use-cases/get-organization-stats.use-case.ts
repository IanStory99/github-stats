import { OrganizationEntity, UserStatisticsEntity } from "@/domain/entities";
import {
  OrganizationInputDto
} from "@/application/dtos";
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
    this.organizationService = organizationService;
    this.userStatisticsService = userStatisticsService;
    this.formattingService = formattingService;
  }

  async execute(organizationInputDto: OrganizationInputDto) {
    const organization = await this.organizationService.getOrganizationById(
      organizationInputDto.name
      // TODO: Habilitar fechas
      // organizationInputDto.startDate,
      // organizationInputDto.endDate
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
