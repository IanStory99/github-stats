import { LocalOrganizationRepositoryInterface } from '@/domain/interfaces/repositories';
import { OrganizationInputDto } from '@/application/dtos';
import {
  Prisma,
  PrismaClient,
  Organization as PrismaOrganization,
  Team as PrismaTeam,
  Repository as PrismaRepository,
  PullRequest as PrismaPullRequest,
  Commit as PrismaCommit,
  Review as PrismaReview,
  ReviewComment as PrismaReviewComment,
  User as PrismaUser
} from '@prisma/client';
import {
  OrganizationEntity,
  RepositoryEntity,
  TeamEntity,
  PullRequestEntity,
  CommitEntity,
  ReviewEntity,
  ReviewCommentEntity,
  UserEntity
} from "@/domain/entities"

type PrismaSelectOrganizationWithRelations = PrismaOrganization & {
  TEAMS: (PrismaTeam & {
    MEMBERS: PrismaUser[];
  })[];
  REPOSITORIES: (PrismaRepository & {
    PULLREQS: (PrismaPullRequest & {
      COMMITS: PrismaCommit[];
      REVIEWS: (PrismaReview & {
        REVIEW_COMMENTS: PrismaReviewComment[];
      })[];
    })[];
  })[];
}

class PrismaLocalOrganizationRepository implements LocalOrganizationRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        ID: organizationDTO.name
      },
      include: {
        REPOSITORIES: {
          include: {
            PULLREQS: {
              include: {
                COMMITS: true,
                REVIEWS: {
                  include: {
                    REVIEW_COMMENTS: true
                  }
                }
              }
            },
          }
        },
        TEAMS: {
          include: {
            MEMBERS: true
          }
        }
      }
    });

    if (!organization) {
      return null;
    }

    return this.prismaToDomain(organization);
  }

  async persist(organization: OrganizationEntity): Promise<void> {
    await this.prisma.organization.upsert({
      where: {
        ID: organization.getId(),
      },
      create: this.domainToPrismaCreate(organization),
      update: this.domainToPrismaUpdate(organization)
    });
  }

  private prismaToDomain(organization: PrismaSelectOrganizationWithRelations): OrganizationEntity {
    return new OrganizationEntity(
      organization.ID,
      organization.NAME,
      organization.REPOSITORIES.map((repository) => new RepositoryEntity(
        repository.ID,
        repository.OWNER_ORGANIZATION_ID,
        repository.URL,
        repository.NAME,
        repository.PULLREQS.map((pullRequest) => new PullRequestEntity(
          pullRequest.ID,
          pullRequest.REPO_ID,
          pullRequest.AUTHOR_ID,
          pullRequest.COMMITS.map((commit) => new CommitEntity(
            commit.ID,
            commit.AUTHOR_ID,
            commit.PULLREQ_ID,
            commit.ADDITIONS,
            commit.DELETIONS
          )),
          pullRequest.REVIEWS.map((review) => new ReviewEntity(
            review.ID,
            review.PULLREQ_ID,
            review.AUTHOR_ID,
            review.STATE,
            review.REVIEW_COMMENTS.map((reviewComment) => new ReviewCommentEntity(
              reviewComment.ID,
              reviewComment.REVIEW_ID,
              reviewComment.AUTHOR_ID,
              reviewComment.TEXT
            ))
          )),
          pullRequest.CREATED_AT,
          pullRequest.UPDATED_AT,
          pullRequest.MERGED_AT
        ))
      )),
      organization.TEAMS.map((team) => new TeamEntity(
        team.ID,
        team.ORGANIZATION_ID,
        team.NAME,
        team.SLUG,
        team.MEMBERS.map((member) => new UserEntity(
          member.ID,
          member.LOGIN,
          []
        ))
      ))
    );
  }

  private domainToPrismaCreate(organization: OrganizationEntity): Prisma.OrganizationCreateInput {
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
            create: team.getMembers().map((member) => ({
              ID: member.getId(),
              LOGIN: member.getLogin(),
              TIMESTAMP: new Date(),
              ORGANIZATION: {
                connect: {
                  ID: organization.getId()
                }
              }
            }))
          }
        }))
      },
    }
  }

  private domainToPrismaUpdate(organization: OrganizationEntity): Prisma.OrganizationUpdateInput {
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
              create: team.getMembers().map((member) => ({
                ID: member.getId(),
                LOGIN: member.getLogin(),
                TIMESTAMP: new Date(),
                ORGANIZATION: {
                  connect: {
                    ID: organization.getId()
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
              upsert: team.getMembers().map((member) => ({
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
                },
                update: {
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

export default PrismaLocalOrganizationRepository;
