import { ReviewedPRCountStatisticsEntity, OrganizationEntity } from "@/domain/entities";

describe("ReviewedPRCountStatisticsEntity", () => {
  it("should calculate the reviewed PR count", () => {
    const statistics = new ReviewedPRCountStatisticsEntity();
    const organization = {
      getRepositories: jest.fn(),
      getUsers: jest.fn(),
      findUserById: jest.fn(),
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
        getUserId: jest.fn(),
      },
      {
        getReviews: jest.fn(),
        getUserId: jest.fn(),
      },
      {
        getReviews: jest.fn(),
        getUserId: jest.fn(),
      },
    ];
    const reviews = [
      {
        getAuthorId: jest.fn(),
        isReviewed: jest.fn(),
      },
      {
        getAuthorId: jest.fn(),
        isReviewed: jest.fn(),
      },
      {
        getAuthorId: jest.fn(),
        isReviewed: jest.fn(),
      },
    ];
    const users = [
      {
        getId: jest.fn(),
        getTeamId: jest.fn(),
      },
      {
        getId: jest.fn(),
        getTeamId: jest.fn(),
      },
    ];
    const expectedStatistics = {
      user1: "0.67",
      user2: "0.33",
    };

    organization.getRepositories.mockReturnValue(repositories);
    organization.findUserById.mockImplementation((id) => users.find((user) => user.getId() === id));
    repositories[0].getPullRequests.mockReturnValue(pullRequests);
    repositories[1].getPullRequests.mockReturnValue(pullRequests);
    pullRequests[0].getReviews.mockReturnValue(reviews);
    pullRequests[1].getReviews.mockReturnValue(reviews);
    pullRequests[2].getReviews.mockReturnValue(reviews);
    pullRequests[0].getUserId.mockReturnValue("user1");
    pullRequests[1].getUserId.mockReturnValue("user2");
    pullRequests[2].getUserId.mockReturnValue("user1");
    reviews[0].getAuthorId.mockReturnValue("user1");
    reviews[1].getAuthorId.mockReturnValue("user2");
    reviews[2].getAuthorId.mockReturnValue("user1");
    reviews[0].isReviewed.mockReturnValue(true);
    reviews[1].isReviewed.mockReturnValue(true);
    reviews[2].isReviewed.mockReturnValue(true);
    organization.getUsers.mockReturnValue(users);
    users[0].getId.mockReturnValue("user1");
    users[1].getId.mockReturnValue("user2");
    users[0].getTeamId.mockReturnValue("team1");
    users[1].getTeamId.mockReturnValue("team2");

    expect(statistics.calculate(organization as unknown as OrganizationEntity)).toEqual(expectedStatistics);
  });
});
