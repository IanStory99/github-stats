import { StatisticsInterface } from "@/domain/interfaces/entities";
import { OrganizationEntity } from "@/domain/entities";

class CodeDiffCountStatisticsEntity implements StatisticsInterface {
  private code = "code-diff-count";

  getStatisticCode(): string {
    return this.code;
  }

  calculate(organization: OrganizationEntity): Record<string, number> {
    const repositories = organization.getRepositories();
    const users = organization.getUsers();
    const statistics = {};

    for (const user of users) {
      let codeDiffCount = 0;
      for (const repository of repositories) {
        const repositoryPullRequests = repository.getPullRequests();
        for (const pullRequest of repositoryPullRequests) {
          const pullRequestCommits = pullRequest.getCommits();
          for (const commit of pullRequestCommits) {
            if (commit.getAuthorLogin() === user.getId()) {
              codeDiffCount += commit.getCodeDiffCount();
            }
          }
        }
      }
      statistics[user.getId()] = codeDiffCount;
    }

    return statistics;
  }
}

export default CodeDiffCountStatisticsEntity;
