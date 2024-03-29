import { RepositoryEntity } from "../../domain/entities";
import Mapper from "../../domain/interfaces/mappers/Mapper.interface";

class RepositoryMap implements Mapper<RepositoryEntity> {
    public toDomain(raw: any): RepositoryEntity {
        const repo = new RepositoryEntity(
            raw.id,
            raw.ownerId,
            raw.url,
            raw.name,
            []
        );
        return repo;
    }
}

export default RepositoryMap;