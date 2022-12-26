/* eslint-disable @typescript-eslint/ban-ts-comment */
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

type PrismaUpdateOrganizationWithRelations = Prisma.OrganizationUpdateInput & {
  TEAMS: (Prisma.TeamUpdateInput & {
    MEMBERS: Prisma.UserUpdateInput[];
  })[];
  REPOSITORIES: (Prisma.RepositoryUpdateInput & {
    PULLREQS: (Prisma.PullRequestUpdateInput & {
      COMMITS: Prisma.CommitUpdateInput[];
      REVIEWS: (Prisma.ReviewUpdateInput & {
        REVIEW_COMMENTS: Prisma.ReviewCommentUpdateInput[];
      })[];
    })[];
  })[];
}

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
    const organizationToSave = this.domainToPrisma(organization);

    await this.prisma.organization.upsert({
      where: {
        ID: organization.getId(),
      },
      // @ts-ignore
      create: organizationToSave,
      update: organizationToSave,
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

  private domainToPrisma(organization: OrganizationEntity): PrismaUpdateOrganizationWithRelations {
    // TODO: Add TIMESTAMPS
    return {
      ID: organization.getId(),
      NAME: organization.getName(),
      REPOSITORIES: organization.getRepositories().map((repository) => ({
        ID: repository.getId(),
        OWNER_ORGANIZATION_ID: repository.getOwnerId(),
        URL: repository.getUrl(),
        NAME: repository.getName(),
        TIMESTAMP: null,
        PULLREQS: repository.getPullRequests().map((pullRequest) => ({
          ID: pullRequest.getId(),
          REPO_ID: pullRequest.getRepositoryId(),
          AUTHOR_ID: pullRequest.getUserId(),
          COMMITS: pullRequest.getCommits().map((commit) => ({
            ID: commit.getId(),
            AUTHOR_ID: commit.getAuthorLogin(),
            PULLREQ_ID: commit.getPullRequestId(),
            ADDITIONS: commit.getAdditions(),
            DELETIONS: commit.getDeletions(),
            TIMESTAMP: null
          })),
          REVIEWS: pullRequest.getReviews().map((review) => ({
            ID: review.getId(),
            PULLREQ_ID: review.getPullRequestId(),
            AUTHOR_ID: review.getAuthorId(),
            STATE: review.getState(),
            TIMESTAMP: null,
            REVIEW_COMMENTS: review.getReviewComments().map((reviewComment) => ({
              ID: reviewComment.getId(),
              REVIEW_ID: reviewComment.getReviewId(),
              AUTHOR_ID: reviewComment.getLogin(),
              TEXT: reviewComment.getText(),
              TIMESTAMP: null
            }))
          })),
          CREATED_AT: pullRequest.getCreatedAt(),
          UPDATED_AT: pullRequest.getUpdatedAt(),
          MERGED_AT: pullRequest.getMergedAt(),
          TIMESTAMP: null
        }))
      })),
      TEAMS: organization.getTeams().map((team) => ({
        ID: team.getId(),
        ORGANIZATION_ID: team.getOrganizationId(),
        NAME: team.getName(),
        SLUG: team.getSlug(),
        MEMBERS: team.getMembers().map((member) => ({
          ID: member.getId(),
          LOGIN: member.getLogin(),
          TEAM_ID: member.getTeamId(),
          ORGANIZATION_ID: team.getOrganizationId(),
          TIMESTAMP: null
        })),
        TIMESTAMP: null
      }))
    };
  }
}

export default PrismaLocalOrganizationRepository;
