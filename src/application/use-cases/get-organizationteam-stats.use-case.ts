import { OrganizationEntity, UserStatisticsEntity } from "@/domain/entities";
import {
  OrganizationServiceInterface,
  UserStatisticsServiceInterface,
  FormattingServiceInterface
} from "@/domain/interfaces/services";
import OrganizationTeamInputDto from "../dtos/organizationteam-input.dto";

class GetOrganizationTeamStatsUseCase {
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

  async execute(organizationInputDto: OrganizationTeamInputDto) {
    const organization = await this.organizationService.getOrganizationByIdFilteredByTeamSlug(
      organizationInputDto
    );
    const organizationUsersStatistics = this.userStatisticsService.getOrganizationUsersStatistics(
      organization
    );
    const statsJSON = this.buildStatsJSON(organization, organizationUsersStatistics);
    const formattedStatistics = this.formattingService.format(statsJSON);
    formattedStatistics.saveToFile(organizationInputDto.savePath);

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

export default GetOrganizationTeamStatsUseCase;
