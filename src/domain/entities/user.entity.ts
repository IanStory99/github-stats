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

  public getRepositories(): RepositoryEntity[] {
    return this.repositories;
  }

  public getTeamId(): string {
    return this.teamId;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setLogin(login: string): void {
    this.login = login;
  }

  public setRepositories(repositories: RepositoryEntity[]): void {
    this.repositories = repositories;
  }

  public setTeamId(teamId: string): void {
    this.teamId = teamId;
  }
}

export default UserEntity;
