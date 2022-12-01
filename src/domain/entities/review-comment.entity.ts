class ReviewCommentEntity {
  private id: string;
  private pullRequestId: string;
  private login: string;
  private text: string;

  constructor(id: string, pullRequestId: string, login: string, text: string) {
    this.id = id;
    this.pullRequestId = pullRequestId;
    this.login = login;
    this.text = text;
  }

  public getId(): string {
    return this.id;
  }

  public getPullRequestId(): string {
    return this.pullRequestId;
  }

  public getLogin(): string {
    return this.login;
  }

  public getText(): string {
    return this.text;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setPullRequestId(pullRequestId: string): void {
    this.pullRequestId = pullRequestId;
  }

  public setLogin(login: string): void {
    this.login = login;
  }

  public setText(text: string): void {
    this.text = text;
  }
}

export default ReviewCommentEntity;
