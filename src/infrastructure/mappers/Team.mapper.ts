import { TeamEntity, UserEntity } from "../../domain/entities";
import Mapper from "../../domain/interfaces/mappers/Mapper.interface";

class TeamMap implements Mapper<TeamEntity> {
    public toDomain(raw: any): TeamEntity {
        const team = new TeamEntity(
            raw.id,
            raw.id,
            raw.name,
            raw.name,
            // TODO: Mover a un mapper de usuarios
            raw.members.map((user) => (
                new UserEntity(
                    user.login,
                    user.login,
                    []
                )
            ))
        );
        return team;
    }
}

export default TeamMap;