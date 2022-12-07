import { CodeDiffCountStatisticsEntity, OrganizationEntity } from "@/domain/entities";

describe("CodeDiffCountStatisticsEntity", () => {
  it("should calculate the code diff count", () => {
    const statistics = new CodeDiffCountStatisticsEntity();
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
        getCommits: jest.fn(),
      },
      {
        getCommits: jest.fn(),
      },
    ];
    const commits = [
      {
        getAuthorLogin: jest.fn(),
        getCodeDiffCount: jest.fn(),
      },
      {
        getAuthorLogin: jest.fn(),
        getCodeDiffCount: jest.fn(),
      },
      {
        getAuthorLogin: jest.fn(),
        getCodeDiffCount: jest.fn(),
      }
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
    repositories[1].getPullRequests.mockReturnValue([]);
    pullRequests[0].getCommits.mockReturnValue(commits);
    pullRequests[1].getCommits.mockReturnValue([]);
    commits[0].getAuthorLogin.mockReturnValue("user 1");
    commits[1].getAuthorLogin.mockReturnValue("user 2");
    commits[2].getAuthorLogin.mockReturnValue("user 1");
    commits[0].getCodeDiffCount.mockReturnValue(10);
    commits[1].getCodeDiffCount.mockReturnValue(20);
    commits[2].getCodeDiffCount.mockReturnValue(30);

    users[0].getId.mockReturnValue("user 1");
    users[1].getId.mockReturnValue("user 2");

    const result = statistics.calculate(organization as unknown as OrganizationEntity);

    expect(result).toEqual({
      "user 1": 40,
      "user 2": 20,
    });
  });
});