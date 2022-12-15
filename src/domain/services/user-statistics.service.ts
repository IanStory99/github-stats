/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserStatisticsServiceInterface } from "@/domain/interfaces/services";
import { StatisticsInterface } from "@/domain/interfaces/entities";
import { UserStatisticsEntity, OrganizationEntity } from "@/domain/entities";

// @ts-ignore
class UserStatisticsService implements UserStatisticsServiceInterface {
  private statistics: StatisticsInterface[];

  constructor(statistics: StatisticsInterface[]) {
    this.statistics = statistics;
  }

  getOrganizationUsersStatistics(organization: OrganizationEntity): UserStatisticsEntity[] {
    const usersStatistics = [] as UserStatisticsEntity[];

    for (const statistic of this.statistics) {
      const statisticCode = statistic.getStatisticCode();
      const statisticValue = statistic.calculate(organization);

      Object.entries(statisticValue).forEach(([userId, value]) => {
        const userStatistic = usersStatistics.find((userStatistic) => userStatistic.getUserId() === userId);
        if (userStatistic) {
          userStatistic.addStatistic(statisticCode, value);
        } else {
          usersStatistics.push(new UserStatisticsEntity(userId, { [statisticCode]: value }));
        }
      });
    }

    return usersStatistics;
  }
}

export default UserStatisticsService;
