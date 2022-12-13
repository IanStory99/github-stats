class CommitEntity {
  private id: string;
  private authorLogin: string;
  private pullRequestId: string;
  private additions: number;
  private deletions: number;

  constructor(
    id: string,
    authorLogin: string,
    pullRequestId: string,
    additions: number,
    deletions: number
  ) {
    this.id = id;
    this.authorLogin = authorLogin;
    this.pullRequestId = pullRequestId;
    this.additions = additions;
    this.deletions = deletions;
  }

  public getAuthorLogin(): string {
    return this.authorLogin;
  }

  public getCodeDiffCount(): number {
    return this.additions + this.deletions;
  }

}

export default CommitEntity;
