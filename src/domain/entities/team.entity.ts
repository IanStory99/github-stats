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

  public getName(): string {
    return this.name;
  }
  
  public getMembers(): UserEntity[] {
    return this.members;
  }

}

export default TeamEntity;
