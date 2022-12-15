import { PullRequestEntity } from "@/domain/entities";

class RepositoryEntity {
  private id: string;
  private ownerId: string;
  private url: string;
  private name: string;
  private pullRequests: PullRequestEntity[];

  constructor(
    id: string,
    ownerId: string,
    url: string,
    name: string,
    pullRequests: PullRequestEntity[]
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.url = url;
    this.name = name;
    this.pullRequests = pullRequests;
  }

  public getId(): string {
    return this.id;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getUrl(): string {
    return this.url;
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

  public setUrl(url: string): void {
    this.url = url;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setPullRequests(pullRequests: PullRequestEntity[]): void {
    this.pullRequests = pullRequests;
  }
}

export default RepositoryEntity;
