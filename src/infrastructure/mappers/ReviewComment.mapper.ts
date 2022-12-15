import { ReviewCommentEntity } from "../../domain/entities";
import Mapper from "../../domain/interfaces/mappers/Mapper.interface";

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