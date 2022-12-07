import { ExecutedPRCountStatisticsEntity, OrganizationEntity } from "@/domain/entities";

describe("ExecutedPRCountStatisticsEntity", () => {
  it("should calculate the executed PR count", () => {
    const statistics = new ExecutedPRCountStatisticsEntity();
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
        getUserId: jest.fn(),
        isExecuted: jest.fn(),
      },
      {
        getUserId: jest.fn(),
        isExecuted: jest.fn(),
      },
      {
        getUserId: jest.fn(),
        isExecuted: jest.fn(),
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

    organization.getRepositories.mockReturnValue(repositories);
    organization.getUsers.mockReturnValue(users);
    repositories[0].getPullRequests.mockReturnValue(pullRequests);
    repositories[1].getPullRequests.mockReturnValue(pullRequests);
    pullRequests[0].getUserId.mockReturnValue("user 1");
    pullRequests[1].getUserId.mockReturnValue("user 2");
    pullRequests[2].getUserId.mockReturnValue("user 1");
    pullRequests[0].isExecuted.mockReturnValue(true);
    pullRequests[1].isExecuted.mockReturnValue(false);
    pullRequests[2].isExecuted.mockReturnValue(true);
    users[0].getId.mockReturnValue("user 1");
    users[1].getId.mockReturnValue("user 2");

    const result = statistics.calculate(organization as unknown as OrganizationEntity);

    expect(result).toEqual({
      "user 1": 4,
      "user 2": 0,
    });
  });
});
