import { ReviewEntity, CommitEntity } from "@/domain/entities";

class PullRequestEntity {
  private id: string;
  private repositoryId: string;
  private userId: string;
  private commits: CommitEntity[];
  private reviews: ReviewEntity[];
  private createdAt: Date;
  private updatedAt: Date;
  private mergedAt: Date;

  constructor(
    id: string,
    repositoryId: string,
    userId: string,
    commits: CommitEntity[],
    reviews: ReviewEntity[],
    createdAt: Date,
    updatedAt: Date,
    mergedAt: Date
  ) {
    this.id = id;
    this.repositoryId = repositoryId;
    this.userId = userId;
    this.commits = commits;
    this.reviews = reviews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.mergedAt = mergedAt;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getCommits(): CommitEntity[] {
    return this.commits;
  }

  public getReviews(): ReviewEntity[] {
    return this.reviews;
  }

  public isExecuted(): boolean {
    return this.mergedAt !== null;
  }

}

export default PullRequestEntity;
