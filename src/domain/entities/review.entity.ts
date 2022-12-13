import { ReviewCommentEntity } from "@/domain/entities";

class ReviewEntity {
  private id: string;
  private pullRequestId: string;
  private authorId: string;
  private state: string;
  private reviewComments: ReviewCommentEntity[];

  constructor(id: string, pullRequestId: string, authorId: string, state: string, reviewComments: ReviewCommentEntity[]) {
    this.id = id;
    this.pullRequestId = pullRequestId;
    this.authorId = authorId;
    this.state = state;
    this.reviewComments = reviewComments;
  }

  public getAuthorId(): string {
    return this.authorId;
  }

  public getReviewComments(): ReviewCommentEntity[] {
    return this.reviewComments;
  }

  public isReviewed(): boolean {
    return this.state === "APPROVED" || this.state === "CHANGES_REQUESTED";
  }

}

export default ReviewEntity;
