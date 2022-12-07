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
        getReviewComments: jest.fn(),
      },
      {
        getReviewComments: jest.fn(),
      },
    ];
    const comments = [
      {
        getText: jest.fn(),
        getLogin: jest.fn()
      },
      {
        getText: jest.fn(),
        getLogin: jest.fn()
      },
      {
        getText: jest.fn(),
        getLogin: jest.fn()
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
    repositories[1].getPullRequests.mockReturnValue(pullRequests);
    pullRequests[0].getReviewComments.mockReturnValue(comments);
    pullRequests[1].getReviewComments.mockReturnValue(comments);
    comments[0].getText.mockReturnValue("comment 1");
    comments[1].getText.mockReturnValue("comment 2");
    comments[2].getText.mockReturnValue("comment 3 - more length");
    comments[0].getLogin.mockReturnValue("user 1");
    comments[1].getLogin.mockReturnValue("user 2");
    comments[2].getLogin.mockReturnValue("user 1");
    users[0].getId.mockReturnValue("user 1");
    users[1].getId.mockReturnValue("user 2");

    const result = statistics.calculate(organization as unknown as OrganizationEntity);

    expect(result).toEqual({
      "user 1": 16,
      "user 2": 9,
    });
  });
});
