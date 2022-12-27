import {
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

class PrismaToDomainOrganizationMapper {
  static map(organization: PrismaSelectOrganizationWithRelations): OrganizationEntity {
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
}

export default PrismaToDomainOrganizationMapper;
