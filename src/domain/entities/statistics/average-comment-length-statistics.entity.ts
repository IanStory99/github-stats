import { StatisticsInterface } from "@/domain/interfaces/entities";
import { OrganizationEntity, ReviewCommentEntity } from "@/domain/entities";

class AverageCommentLengthStatisticsEntity implements StatisticsInterface {
  private code = "average-comment-length";

  getStatisticCode(): string {
    return this.code;
  }

  calculate(organization: OrganizationEntity): Record<string, number> {
    const repositories = organization.getRepositories();
    const users = organization.getUsers();
    const statistics = {};

    for (const user of users) {
      const comments = [] as ReviewCommentEntity[];
      for (const repository of repositories) {
        const repositoryPullRequests = repository.getPullRequests();
        for (const pullRequest of repositoryPullRequests) {
          const pullRequestReviews = pullRequest.getReviews();
          for (const review of pullRequestReviews) {
            const reviewComments = review.getReviewComments();
            for (const comment of reviewComments) {
              if (comment.getLogin() === user.getId()) {
                comments.push(comment);
              }
            }
          }
        }
      }
      const averageCommentLength = this.calculateAverageCommentLength(comments);
      statistics[user.getId()] = averageCommentLength;
    }

    return statistics;
  }

  private calculateAverageCommentLength(comments: ReviewCommentEntity[]) {
    let totalCommentLength = 0;
    for (const comment of comments) {
      totalCommentLength += comment.getText().length;
    }
    return (totalCommentLength / comments.length) || 0;
  }
}

export default AverageCommentLengthStatisticsEntity;
