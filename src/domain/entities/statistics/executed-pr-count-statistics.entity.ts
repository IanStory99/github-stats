import { StatisticsInterface } from "@/domain/interfaces/entities";
import { OrganizationEntity } from "@/domain/entities";

class ExecutedPRCountStatisticsEntity implements StatisticsInterface {
  private code = "executed-pr-count";

  getStatisticCode(): string {
    return this.code;
  }

  calculate(organization: OrganizationEntity): Record<string, number> {
    const repositories = organization.getRepositories();
    const users = organization.getUsers();
    const statistics = {};

    for (const user of users) {
      let executedPRCount = 0;
      for (const repository of repositories) {
        const repositoryPullRequests = repository.getPullRequests();
        for (const pullRequest of repositoryPullRequests) {
          if (pullRequest.getUserId() === user.getId() && pullRequest.isExecuted()) {
            executedPRCount += 1;
          }
        }
      }
      statistics[user.getId()] = executedPRCount;
    }

    return statistics;
  }
}

export default ExecutedPRCountStatisticsEntity;
