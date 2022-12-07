import { CommitCountStatisticsEntity, OrganizationEntity } from "@/domain/entities";

describe("CommitCountStatisticsEntity", () => {
  it("should calculate the commit count", () => {
    const statistics = new CommitCountStatisticsEntity();
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
      },
      {
        getAuthorLogin: jest.fn(),
      },
      {
        getAuthorLogin: jest.fn(),
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
    pullRequests[1].getCommits.mockReturnValue(commits);
    commits[0].getAuthorLogin.mockReturnValue("user 1");
    commits[1].getAuthorLogin.mockReturnValue("user 2");
    commits[2].getAuthorLogin.mockReturnValue("user 1");
    users[0].getId.mockReturnValue("user 1");
    users[1].getId.mockReturnValue("user 2");

    expect(statistics.calculate(organization as unknown as OrganizationEntity)).toEqual({
      "user 1": 4,
      "user 2": 2,
    });
  });
});