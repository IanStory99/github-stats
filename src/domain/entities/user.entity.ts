import { RepositoryEntity } from "@/domain/entities";

class UserEntity {
  private id: string;
  private login: string;
  private repositories: RepositoryEntity[];
  private teamId: string;

  constructor(id: string, login: string, repositories: RepositoryEntity[]) {
    this.id = id;
    this.login = login;
    this.repositories = repositories;
  }

  public getId(): string {
    return this.id;
  }

  public getLogin(): string {
    return this.login;
  }
  
  public getTeamId(): string {
    return this.teamId;
  }

}

export default UserEntity;
