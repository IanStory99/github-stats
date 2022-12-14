import { ReviewEntity } from "../entities";
import Mapper from "../interfaces/mappers/Mapper.interface";

class ReviewMap implements Mapper<ReviewEntity> {
    public toDomain(raw: any): ReviewEntity {
        return new ReviewEntity(
            raw.id,
            raw.author,
            raw.pullRequestId,
            raw.state,
        );
    }
}

export default ReviewMap;