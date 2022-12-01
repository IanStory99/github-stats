import { ReviewCommentEntity, CommitEntity } from "@/domain/entities";

class PullRequestEntity {
  private id: string;
  private repositoryId: string;
  private userId: string;
  private commits: CommitEntity[];
  private reviewComments: ReviewCommentEntity[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    repositoryId: string,
    userId: string,
    commits: CommitEntity[],
    reviewComments: ReviewCommentEntity[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.repositoryId = repositoryId;
    this.userId = userId;
    this.commits = commits;
    this.reviewComments = reviewComments;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getRepositoryId(): string {
    return this.repositoryId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getCommits(): CommitEntity[] {
    return this.commits;
  }

  public getReviewComments(): ReviewCommentEntity[] {
    return this.reviewComments;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setRepositoryId(repositoryId: string): void {
    this.repositoryId = repositoryId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public setCommits(commits: CommitEntity[]): void {
    this.commits = commits;
  }

  public setReviewComments(reviewComments: ReviewCommentEntity[]): void {
    this.reviewComments = reviewComments;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}

export default PullRequestEntity;
