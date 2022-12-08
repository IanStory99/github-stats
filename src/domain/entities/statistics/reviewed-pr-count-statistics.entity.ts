import { StatisticsInterface } from "@/domain/interfaces/entities";
import { OrganizationEntity } from "@/domain/entities";

class ReviewedPRCountStatisticsEntity implements StatisticsInterface {
  private code = "reviewed-pr-count";

  getStatisticCode(): string {
    return this.code;
  }

  calculate(organization: OrganizationEntity): Record<string, number> {
    const repositories = organization.getRepositories();
    const users = organization.getUsers();
    const statistics = {};

    for (const user of users) {
      const reviewedPRCount = {
        insideTeam: 0,
        outsideTeam: 0
      };
      for (const repository of repositories) {
        const repositoryPullRequests = repository.getPullRequests();
        for (const pullRequest of repositoryPullRequests) {
          const pullRequestReviews = pullRequest.getReviews();
          for (const review of pullRequestReviews) {
            const pullRequestAuthorId = pullRequest.getUserId();
            const pullRequestAuthorUser = organization.findUserById(pullRequestAuthorId);
            if (review.getAuthorId() === user.getId() && review.isReviewed()) {
              if (pullRequestAuthorUser.getTeamId() === user.getTeamId()) {
                reviewedPRCount.insideTeam++;
              } else {
                reviewedPRCount.outsideTeam++;
              }
            }
          }
        }
      }
      statistics[user.getId()] = reviewedPRCount;
    }

    return this.calculateReviewedPRInsideTeamPercentage(statistics);
  }

  private calculateReviewedPRInsideTeamPercentage(statistics) {
    const percentageStatistics = {};
    for (const userId in statistics) {
      const reviewedPRCount = statistics[userId];
      const percentage = reviewedPRCount.insideTeam / (reviewedPRCount.insideTeam + reviewedPRCount.outsideTeam);
      percentageStatistics[userId] = percentage.toFixed(2);
    }
    return percentageStatistics;
  }
}

export default ReviewedPRCountStatisticsEntity;
