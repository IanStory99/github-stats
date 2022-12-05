import { UserStatisticsServiceInterface } from "@/domain/interfaces/services";
import { StatisticsInterface } from "@/domain/interfaces/entities";

class UserStatisticsService implements UserStatisticsServiceInterface {
  private statistics: StatisticsInterface[];

  constructor(statistics: StatisticsInterface[]) {
    this.statistics = statistics;
  }

  getOrganizationUsersStatistics(organization: OrganizationEntity) {
    // ...
  }

  getUserOrganizationsStatistics(username: string, organizations: OrganizationEntity[]) {
    // ...
  }
}

export default UserStatisticsService;
