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

  public getId(): string {
    return this.id;
  }

  public getPullRequestId(): string {
    return this.pullRequestId;
  }

  public getAuthorId(): string {
    return this.authorId;
  }

  public getState(): string {
    return this.state;
  }

  public getReviewComments(): ReviewCommentEntity[] {
    return this.reviewComments;
  }

  public isReviewed(): boolean {
    return this.state === "APPROVED" || this.state === "CHANGES_REQUESTED";
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setPullRequestId(pullRequestId: string): void {
    this.pullRequestId = pullRequestId;
  }

  public setAuthorId(authorId: string): void {
    this.authorId = authorId;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public setReviewComments(reviewComments: ReviewCommentEntity[]): void {
    this.reviewComments = reviewComments;
  }
}

export default ReviewEntity;
