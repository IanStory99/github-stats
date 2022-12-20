import { GitRepositoryInterface } from "@/domain/interfaces/repositories";
import { MapperInterface as Mapper } from "@/domain/interfaces/mappers";
import { GRAPHQL_GITHUB, GRAPHQL_TOKEN } from "@/infrastructure/config";
import {
  CommitEntity,
  OrganizationEntity,
  PullRequestEntity,
  RepositoryEntity,
  ReviewCommentEntity,
  ReviewEntity,
  TeamEntity
} from "@/domain/entities";
import {
  CommitMapper as CommitMap,
  PullRequestMapper as PullRequestMap,
  RepositoryMapper as RepositoryMap,
  ReviewMapper as ReviewMap,
  ReviewCommentMapper as ReviewCommentMap,
  TeamMapper as TeamMap
} from "@/infrastructure/mappers";

class GithubRepository implements GitRepositoryInterface {

  private serviceURI: string;
  private serviceToken: string;
  private request = require("axios");
  private static RECORDS_PER_PAGE = 10;

  constructor() {
    this.serviceURI = GRAPHQL_GITHUB;
    this.serviceToken = GRAPHQL_TOKEN;
  }
  private async executeGraphQLQuery(query: string): Promise<any> {
    try {
      const { data, status } = await this.request(this.serviceURI, {
        method: "POST",
        data: JSON.stringify({ query }),
        headers: {
          Authorization: `Bearer ${this.serviceToken}`,
        },
      });

      if (status !== 200) {
        throw new Error('Something went wrong trying to access Github API');
      }
      return data;
    } catch (e) {
      throw new Error(`Something went wrong trying to getDataByOrganization: ${e}`);
    }
  }

  private buildQueryGetTeamsByOrganizationId(organizationId: string, recordsPerPage: number, nextPageCursor?: string) {

    const nextPage = nextPageCursor ? `, after: "${nextPageCursor}"` : ``;
    const pagePointer = `first: ${recordsPerPage}${nextPage}`
    const query = `
        query {
            organization(login: "${organizationId}") {
              id
              teams(${pagePointer}) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                totalCount
                nodes {
                  id
                  name
                  createdAt
                  members (orderBy: {field: CREATED_AT, direction: ASC}) {
                    nodes {
                      login
                    }
                    totalCount
                  }
                }
              }
            }
        }`
    return query;
  }

  private buildQueryGetRepositoriesByOrganizationId(organizationId: string, recordsPerPage: number, nextPageCursor?: string) {
    const nextPage = nextPageCursor ? `, after: "${nextPageCursor}"` : ``;
    const pagePointer = `first: ${recordsPerPage}${nextPage}`
    const query = `
        query {
            organization(login: "${organizationId}") {
              id
              repositories(${pagePointer}, orderBy: {field: CREATED_AT, direction: ASC}) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                nodes {
                    createdAt
                    id
                    name
                    owner {
                        login
                    }
                     url
                    }
                }
             }
        }`
    return query;
  }

  private builderQueryGetPullRequestByRepositoryFromDate(
    organizationDTO,
    repository: RepositoryEntity,
    recordsPerPage: number,
    nextPageCursor?: string,
  ) {
    const nextPage = nextPageCursor ? `, after: "${nextPageCursor}"` : ``;
    const pagePointer = `first: ${recordsPerPage}${nextPage}`

    var today = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate()-30);

    const OrganizationName = organizationDTO.name;
    const fromDate = organizationDTO.startDate ? organizationDTO.startDate : oneMonthAgo;
    const toDate = organizationDTO.endDate ? organizationDTO.endDate : today;

    const query = `
        query {
            search(
              query: "repo:${OrganizationName}/${repository.getName()} is:pr is:merged created:${fromDate.toISOString()}..${toDate.toISOString()}"
              type: ISSUE
              ${pagePointer}
            ) {
              edges {
                node {
                  ... on PullRequest {
                    id
                    createdAt
                    mergedAt
                    merged
                    deletions
                    additions
                    author {
                      login
                    }
                    reviews(first: 100) {
                      nodes {
                        id
                        state
                        author {
                          login
                        }
                        comments(first: 100) {
                          nodes {
                            author {
                              login
                            }
                            bodyText
                          }
                          pageInfo {
                            endCursor
                            hasNextPage
                          }
                        }
                      }
                      pageInfo {
                        endCursor
                        hasNextPage
                      }
                    }
                    commits(first: 100) {
                      nodes {
                        commit {
                          additions
                          deletions
                          id
                          author {
                            user {
                              login
                            }
                          }
                        }
                      }
                      pageInfo {
                        endCursor
                        hasNextPage
                      }
                    }
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                }
            }
          }`;
    return query;
  }

  private async getTeamsByOrganization(organizationId: string): Promise<TeamEntity[]> {
    const teamList: TeamEntity[] = [];
    const teamMapper: Mapper<TeamEntity> = new TeamMap();
    let hasNextPage = true;
    let nextPageCursor = null;
    while (hasNextPage) {
      const query = this.buildQueryGetTeamsByOrganizationId(organizationId, GithubRepository.RECORDS_PER_PAGE, nextPageCursor)
      const { data } = await this.executeGraphQLQuery(query);
      const { organization } = data;
      const { teams: { pageInfo, nodes: teams } } = organization;

      teams.forEach((team: any) => {
        const rawTeam = {
          id: team.id,
          name: team.name,
          createdAt: team.createdAt,
          members: team.members.nodes,
        }
        const teamInstance = teamMapper.toDomain(rawTeam);
        teamList.push(teamInstance);
      });
      nextPageCursor = pageInfo.endCursor;
      hasNextPage = pageInfo.hasNextPage;
    }
    return teamList;
  }

  private async getRepositoriesByOrganization(organizationId: string): Promise<RepositoryEntity[]> {
    const repositoryList: RepositoryEntity[] = [];
    const repoMapper: Mapper<RepositoryEntity> = new RepositoryMap();

    let hasNextPage = true;
    let nextPageCursor = null;
    while (hasNextPage) {
      const query = this.buildQueryGetRepositoriesByOrganizationId(organizationId, GithubRepository.RECORDS_PER_PAGE, nextPageCursor);
      const { data } = await this.executeGraphQLQuery(query);
      const { organization } = data;
      const { repositories: { pageInfo, nodes: repos } } = organization;
      repos.forEach(async (repo: any) => {
        const rawRepo = {
          id: repo.id,
          ownerId: repo.owner.login,
          url: repo.url,
          name: repo.name,
          createdAt: repo.createdAt,
        }
        const repoInstance = repoMapper.toDomain(rawRepo);
        repositoryList.push(repoInstance);
      });
      nextPageCursor = pageInfo.endCursor;
      hasNextPage = pageInfo.hasNextPage;
    }
    return repositoryList;
  }


  private async getPullRequestsByRepository(organizationDTO, repository: RepositoryEntity): Promise<PullRequestEntity[]> {

    const pullRequestList: PullRequestEntity[] = [];
    const prMapper: Mapper<PullRequestEntity> = new PullRequestMap();
    let hasNextPage = true;
    let nextPageCursor = null;
    while (hasNextPage) {
      const query = this.builderQueryGetPullRequestByRepositoryFromDate(organizationDTO, repository, GithubRepository.RECORDS_PER_PAGE, nextPageCursor);
      const { data } = await this.executeGraphQLQuery(query);
      const { search: { edges: results, pageInfo } } = data;
      // TODO- create reviews object
      results.forEach(({ node: pr }: any) => {
        const rawPR = {
          id: pr.id,
          repositoryId: repository.getId(),
          userId: pr.author.login,
          createdAt: pr.createdAt,
          updatedAt: pr.updatedAt,
          mergedAt: pr.mergedAt,
        }

        const commitList: CommitEntity[] = [];
        const commitMapper: Mapper<CommitEntity> = new CommitMap();

        const reviewList: ReviewEntity[] = [];
        const reviewMapper: Mapper<ReviewEntity> = new ReviewMap();

        const { nodes: commits } = pr.commits
        const { nodes: reviews } = pr.reviews

        reviews.forEach((review: any) => {
          const reviewRaw = {
            id: review.id,
            author: review.author.login,
            pullRequestId: pr.id,
            state: review.state,
          }
          const reviewInstance = reviewMapper.toDomain(reviewRaw)

          const { nodes: comments } = review.comments

          const reviewCommentList: ReviewCommentEntity[] = [];
          const reviewCommentMapper: Mapper<ReviewCommentEntity> = new ReviewCommentMap();

          comments.forEach((comment: any) => {
            const commentRaw = {
              id: review.id,
              reviewId: review.id,
              login: comment.author.login,
              text: comment.bodyText,
            }
            const reviewCommentInstance = reviewCommentMapper.toDomain(commentRaw)
            reviewCommentList.push(reviewCommentInstance);
          })
          reviewInstance.setReviewComments(reviewCommentList);
          reviewList.push(reviewInstance);
        })

        commits.forEach(({ commit }: any) => {
          const commitRaw = {
            id: commit.id,
            pullRequestId: pr.id,
            author: commit.author.user ? commit.author.user.login : null,
            additions: commit.additions,
            deletions: commit.deletions
          }
          const commitInstance = commitMapper.toDomain(commitRaw)
          commitList.push(commitInstance);
        })

        const prInstance = prMapper.toDomain(rawPR);
        prInstance.setReviews(reviewList);
        prInstance.setCommits(commitList);
        pullRequestList.push(prInstance);
      })
      nextPageCursor = pageInfo.endCursor;
      hasNextPage = pageInfo.hasNextPage;
    }
    return pullRequestList;
  }


  public async getOrganizationById(organizationDTO): Promise<OrganizationEntity> {
    console.log(`Retrieving ${organizationDTO.name} organization data from Github...`)
    const repoList: RepositoryEntity[] = await this.getRepositoriesByOrganization(organizationDTO.name);
    const teamList: TeamEntity[] = await this.getTeamsByOrganization(organizationDTO.name);

    for await (const repository of repoList) {
      const pullRequests = await this.getPullRequestsByRepository(organizationDTO, repository);
      repository.setPullRequests(pullRequests);
    }

    const organizationInstance = new OrganizationEntity(
      organizationDTO.name,
      organizationDTO.name,
      repoList,
      teamList
    )
    return organizationInstance;
  }
}

export default GithubRepository;
