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

}

export default RepositoryEntity;
