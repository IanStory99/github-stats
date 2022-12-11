import { PullRequestEntity } from "@/domain/entities";

describe("PullRequestEntity", () => {
  describe("isExecuted", () => {
    it("should return true if the pull request has been merged", () => {
      const pullRequest = new PullRequestEntity(
        "id",
        "repositoryId",
        "userId",
        [],
        [],
        new Date(),
        new Date(),
        new Date()
      );

      expect(pullRequest.isExecuted()).toBe(true);
    });

    it("should return false if the pull request has not been merged", () => {
      const pullRequest = new PullRequestEntity(
        "id",
        "repositoryId",
        "userId",
        [],
        [],
        new Date(),
        new Date(),
        null
      );

      expect(pullRequest.isExecuted()).toBe(false);
    });
  });
});