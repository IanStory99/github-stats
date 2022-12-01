import { PullRequestEntity } from "@/domain/entities";

class RepositoryEntity {
  private id: string;
  private ownerId: string;
  private fullname: string;
  private name: string;
  private pullRequests: PullRequestEntity[];

  constructor(
    id: string,
    ownerId: string,
    fullname: string,
    name: string,
    pullRequests: PullRequestEntity[]
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.fullname = fullname;
    this.name = name;
    this.pullRequests = pullRequests;
  }

  public getId(): string {
    return this.id;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getFullname(): string {
    return this.fullname;
  }

  public getName(): string {
    return this.name;
  }

  public getPullRequests(): PullRequestEntity[] {
    return this.pullRequests;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setOwnerId(ownerId: string): void {
    this.ownerId = ownerId;
  }

  public setFullname(fullname: string): void {
    this.fullname = fullname;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setPullRequests(pullRequests: PullRequestEntity[]): void {
    this.pullRequests = pullRequests;
  }
}

export default RepositoryEntity;
