import { StatisticsInterface } from "@/domain/interfaces/entities";
import { OrganizationEntity } from "@/domain/entities";

class CommitCountStatisticsEntity implements StatisticsInterface {
  calculate(organization: OrganizationEntity): Record<string, number> {
    const repositories = organization.getRepositories();
    const users = organization.getUsers();
    const statistics = {};

    for (const user of users) {
      let commitCount = 0;
      for (const repository of repositories) {
        const repositoryPullRequests = repository.getPullRequests();
        for (const pullRequest of repositoryPullRequests) {
          const pullRequestCommits = pullRequest.getCommits();
          for (const commit of pullRequestCommits) {
            if (commit.getAuthorLogin() === user.getId()) {
              commitCount += 1;
            }
          }
        }
      }
      statistics[user.getId()] = commitCount;
    }

    return statistics;
  }
}

export default CommitCountStatisticsEntity;
