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

}

export default ReviewCommentEntity;
