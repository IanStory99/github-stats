import { TeamEntity } from "../entities";
import Mapper from "../interfaces/mappers/Mapper.interface";

class TeamMap implements Mapper<TeamEntity> {
    public toDomain(raw: any): TeamEntity {
        const team = new TeamEntity(
            raw.id,
            raw.id,
            raw.name,
            raw.name,
            raw.members
        );
        return team;
    }
}

export default TeamMap;