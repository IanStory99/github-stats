class CommitEntity {
  private id: string;
  private pullRequestId: string;
  private additions: number;
  private deletions: number;

  constructor(
    id: string,
    pullRequestId: string,
    additions: number,
    deletions: number
  ) {
    this.id = id;
    this.pullRequestId = pullRequestId;
    this.additions = additions;
    this.deletions = deletions;
  }

  public getId(): string {
    return this.id;
  }

  public getPullRequestId(): string {
    return this.pullRequestId;
  }

  public getAdditions(): number {
    return this.additions;
  }

  public getDeletions(): number {
    return this.deletions;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setPullRequestId(pullRequestId: string): void {
    this.pullRequestId = pullRequestId;
  }

  public setAdditions(additions: number): void {
    this.additions = additions;
  }

  public setDeletions(deletions: number): void {
    this.deletions = deletions;
  }
}

export default CommitEntity;