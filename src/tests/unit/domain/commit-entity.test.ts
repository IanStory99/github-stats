import { CommitEntity } from "@/domain/entities";

describe("CommitEntity", () => {
  describe("getCodeDiffCount", () => {
    it("should return the sum of additions and deletions", () => {
      const commit = new CommitEntity(
        "id",
        "author",
        "pullRequestId",
        10,
        5
      );

      expect(commit.getCodeDiffCount()).toBe(15);
    });
  });
});