import { ReviewEntity } from "@/domain/entities";

describe("ReviewEntity", () => {
  describe("isReviewed", () => {
    it("should return true if the review has been approved", () => {
      const review = new ReviewEntity(
        "id",
        "pullRequestId",
        "userId",
        "APPROVED",
        []
      );

      expect(review.isReviewed()).toBe(true);
    });

    it("should return true if the review has been requested changes", () => {
      const review = new ReviewEntity(
        "id",
        "pullRequestId",
        "userId",
        "CHANGES_REQUESTED",
        []
      );

      expect(review.isReviewed()).toBe(true);
    });

    it("should return false if the review has not been approved or requested changes", () => {
      const review = new ReviewEntity(
        "id",
        "pullRequestId",
        "userId",
        "COMMENTED",
        []
      );

      expect(review.isReviewed()).toBe(false);
    });
  });
});
