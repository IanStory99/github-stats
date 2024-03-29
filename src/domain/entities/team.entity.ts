import { UserEntity } from "@/domain/entities";

class TeamEntity {
  private id: string;
  private organizationId: string;
  private name: string;
  private slug: string;
  private members: UserEntity[];

  constructor(
    id: string,
    organizationId: string,
    name: string,
    slug: string,
    members: UserEntity[]
  ) {
    this.id = id;
    this.organizationId = organizationId;
    this.name = name;
    this.slug = slug;
    this.members = members;
  }

  public getId(): string {
    return this.id;
  }

  public getOrganizationId(): string {
    return this.organizationId;
  }

  public getName(): string {
    return this.name;
  }

  public getSlug(): string {
    return this.slug;
  }

  public getMembers(): UserEntity[] {
    return this.members;
  }

}

export default TeamEntity;
