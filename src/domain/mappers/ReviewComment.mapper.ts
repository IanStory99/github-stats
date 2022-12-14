import { ReviewCommentEntity } from "../entities";
import Mapper from "../interfaces/mappers/Mapper.interface";

class ReviewCommentMap implements Mapper<ReviewCommentEntity> {
    public toDomain(raw: any): ReviewCommentEntity {
        return new ReviewCommentEntity(
            raw.id,
            raw.reviewId,
            raw.author,
            raw.text,
        );
    }
}

export default ReviewCommentMap;