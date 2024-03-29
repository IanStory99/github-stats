import { RepositoryEntity, TeamEntity, UserEntity } from "@/domain/entities";

class OrganizationEntity {
  private id: string;
  private name: string;
  private repositories: RepositoryEntity[];
  private teams: TeamEntity[];

  constructor(
    id: string,
    name: string,
    repositories: RepositoryEntity[],
    teams: TeamEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.repositories = repositories;
    this.teams = teams;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getRepositories(): RepositoryEntity[] {
    return this.repositories;
  }

  public getTeams(): TeamEntity[] {
    return this.teams;
  }

  public getUsers(): Set<UserEntity> {
    const teams = this.getTeams();
    const users = new Set() as Set<UserEntity>;
    for (const team of teams) {
      const teamMembers = team.getMembers();
      for (const member of teamMembers) {
        users.add(member);
      }
    }
    return users;
  }

  public findUserById(id: string): UserEntity | undefined {
    const users = this.getUsers();
    for (const user of users) {
      if (user.getId() === id) {
        return user;
      }
    }
    return undefined;
  }

}

export default OrganizationEntity;
