import { Prisma } from '@prisma/client';
import { OrganizationEntity } from "@/domain/entities"

class DomainOrganizationToPrismaUpdateMapper {
  static map(organization: OrganizationEntity): Prisma.OrganizationUpdateInput {
    // TODO: Add real TIMESTAMPS
    return {
      ID: organization.getId(),
      NAME: organization.getName(),
      TIMESTAMP: new Date(),
      TEAMS: {
        upsert: organization.getTeams().map((team) => ({
          where: {
            ID: team.getId()
          },
          create: {
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
          },
          update: {
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
          }
        }))
      },
    };
  }
}

export default DomainOrganizationToPrismaUpdateMapper;
