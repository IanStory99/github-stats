import { AverageCommentLengthStatisticsEntity, OrganizationEntity } from "@/domain/entities";

describe("AverageCommentLengthStatisticsEntity", () => {
  it("should calculate the average comment length", () => {
    const statistics = new AverageCommentLengthStatisticsEntity();
    const organization = {
      getRepositories: jest.fn(),
      getUsers: jest.fn(),
    };
    const repositories = [
      {
        getPullRequests: jest.fn(),
      },
      {
        getPullRequests: jest.fn(),
      },
    ];
    const pullRequests = [
      {
        getReviews: jest.fn(),
      },
      {
        getReviews: jest.fn(),
      },
    ];
    const reviews = [
      {
        getReviewComments: jest.fn(),
      },
      {
        getReviewComments: jest.fn(),
      },
    ];
    const reviewComments = [
      {
        getLogin: jest.fn(),
        getText: jest.fn(),
      },
      {
        getLogin: jest.fn(),
        getText: jest.fn(),
      },
      {
        getLogin: jest.fn(),
        getText: jest.fn(),
      },
    ];
    const users = [
      {
        getId: jest.fn(),
      },
      {
        getId: jest.fn(),
      },
    ];
    const expectedStatistics = {
      user1: 1,
      user2: 4,
    };

    organization.getRepositories.mockReturnValue(repositories);
    organization.getUsers.mockReturnValue(users);
    repositories[0].getPullRequests.mockReturnValue(pullRequests);
    repositories[1].getPullRequests.mockReturnValue(pullRequests);
    pullRequests[0].getReviews.mockReturnValue(reviews);
    pullRequests[1].getReviews.mockReturnValue(reviews);
    reviews[0].getReviewComments.mockReturnValue(reviewComments);
    reviews[1].getReviewComments.mockReturnValue(reviewComments);
    reviewComments[0].getLogin.mockReturnValue("user1");
    reviewComments[0].getText.mockReturnValue("a");
    reviewComments[1].getLogin.mockReturnValue("user2");
    reviewComments[1].getText.mockReturnValue("aa");
    reviewComments[2].getLogin.mockReturnValue("user2");
    reviewComments[2].getText.mockReturnValue("aaaaaa");
    users[0].getId.mockReturnValue("user1");
    users[1].getId.mockReturnValue("user2");

    const actualStatistics = statistics.calculate(organization as unknown as OrganizationEntity);

    expect(actualStatistics).toEqual(expectedStatistics);
  });
});
