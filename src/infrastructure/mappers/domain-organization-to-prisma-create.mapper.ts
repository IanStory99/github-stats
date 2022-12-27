import { Prisma } from '@prisma/client';
import { OrganizationEntity } from "@/domain/entities"

class DomainOrganizationToPrismaCreateMapper {
  static map(organization: OrganizationEntity): Prisma.OrganizationCreateInput {
    // TODO: Add real TIMESTAMPS
    return {
      ID: organization.getId(),
      NAME: organization.getName(),
      TIMESTAMP: new Date(),
      TEAMS: {
        create: organization.getTeams().map((team) => ({
          ID: team.getId(),
          NAME: team.getName(),
          SLUG: team.getSlug(),
          TIMESTAMP: new Date(),
          MEMBERS: {
            connectOrCreate: team.getMembers().map((member) => ({
              where: {
                ID: member.getId()
              },
              create: {
                ID: member.getId(),
                LOGIN: member.getLogin(),
                TIMESTAMP: new Date(),
                ORGANIZATION: {
                  connect: {
                    ID: organization.getId()
                  }
                }
              }
            }))
          }
        }))
      },
    }
  }
}

export default DomainOrganizationToPrismaCreateMapper;
