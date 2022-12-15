import { PullRequestEntity } from "../../domain/entities";
import Mapper from "../../domain/interfaces/mappers/Mapper.interface";

class PullRequestMap implements Mapper<PullRequestEntity> {
    public toDomain(raw: any): PullRequestEntity {
        return new PullRequestEntity(
            raw.id,
            raw.repositoryId,
            raw.userId,
            [],
            [],
            raw.createdAt,
            raw.updatedAt,
            raw.mergedAt
        );
    }
}

export default PullRequestMap;