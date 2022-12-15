import { CommitEntity } from "../../domain/entities";
import Mapper from "../../domain/interfaces/mappers/Mapper.interface";

class CommitMap implements Mapper<CommitEntity> {
    public toDomain(raw: any): CommitEntity {
        return new CommitEntity(
            raw.id,
            raw.author,
            raw.pullRequestId,
            raw.additions,
            raw.deletions
        );
    }
}

export default CommitMap;