class ReviewCommentEntity {
  private id: string;
  private reviewId: string;
  private login: string;
  private text: string;

  constructor(id: string, reviewId: string, login: string, text: string) {
    this.id = id;
    this.reviewId = reviewId;
    this.login = login;
    this.text = text;
  }

  public getId(): string {
    return this.id;
  }

  public getReviewId(): string {
    return this.reviewId;
  }

  public getLogin(): string {
    return this.login;
  }

  public getText(): string {
    return this.text;
  }

}

export default ReviewCommentEntity;
