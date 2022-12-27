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
      REPOSITORIES: {
        create: organization.getRepositories().map((repository) => ({
          ID: repository.getId(),
          NAME: repository.getName(),
          URL: repository.getUrl(),
          TIMESTAMP: new Date(),
          PULLREQS: {
            create: repository.getPullRequests().map((pullRequest) => ({
              ID: pullRequest.getId(),
              AUTHOR: {
                connectOrCreate: {
                  where: {
                    ID: pullRequest.getUserId()
                  },
                  create: {
                    ID: pullRequest.getUserId(),
                    LOGIN: pullRequest.getUserId(),
                    TIMESTAMP: new Date(),
                    TEAM: {
                      connect: {
                        ID: organization.getTeams()[0].getId() // TODO: Fix this
                      }
                    },
                    ORGANIZATION: {
                      connect: {
                        ID: organization.getId()
                      }
                    }
                  }
                }
              },
              MERGED_AT: pullRequest.getMergedAt(),
              TIMESTAMP: new Date(),
              // TODO: Add commits
              // COMMITS: {
              //   create: pullRequest.getCommits().map((commit) => ({
              //     ID: commit.getId(),
              //     AUTHOR: {
              //       connectOrCreate: {
              //         where: {
              //           ID: commit.getAuthorLogin() ?? `unknown-commit-${commit.getId()}`
              //         },
              //         create: {
              //           ID: commit.getAuthorLogin() ?? `unknown-commit-${commit.getId()}`,
              //           LOGIN: commit.getAuthorLogin() ?? `unknown-commit-${commit.getId()}`,
              //           TIMESTAMP: new Date(),
              //           TEAM: {
              //             connect: {
              //               ID: organization.getTeams()[0].getId() // TODO: Fix this
              //             }
              //           },
              //           ORGANIZATION: {
              //             connect: {
              //               ID: organization.getId()
              //             }
              //           }
              //         }
              //       }
              //     },
              //     TIMESTAMP: new Date(),
              //     ADDITIONS: commit.getAdditions(),
              //     DELETIONS: commit.getDeletions()
              //   }))
              // },
              REVIEWS: {
                create: pullRequest.getReviews().map((review) => ({
                  ID: review.getId(),
                  AUTHOR: {
                    connectOrCreate: {
                      where: {
                        ID: review.getAuthorId()
                      },
                      create: {
                        ID: review.getAuthorId(),
                        LOGIN: review.getAuthorId(),
                        TIMESTAMP: new Date(),
                        TEAM: {
                          connect: {
                            ID: organization.getTeams()[0].getId() // TODO: Fix this
                          }
                        },
                        ORGANIZATION: {
                          connect: {
                            ID: organization.getId()
                          }
                        }
                      }
                    }
                  },
                  TIMESTAMP: new Date(),
                  STATE: review.getState(),
                  // TODO: Add review comments
                  // REVIEW_COMMENTS: {
                  //   create: review.getReviewComments().map((reviewComment) => ({
                  //     ID: reviewComment.getId(),
                  //     AUTHOR: {
                  //       connectOrCreate: {
                  //         where: {
                  //           ID: reviewComment.getLogin()
                  //         },
                  //         create: {
                  //           ID: reviewComment.getLogin(),
                  //           LOGIN: reviewComment.getLogin(),
                  //           TIMESTAMP: new Date(),
                  //           TEAM: {
                  //             connect: {
                  //               ID: organization.getTeams()[0].getId() // TODO: Fix this
                  //             }
                  //           },
                  //           ORGANIZATION: {
                  //             connect: {
                  //               ID: organization.getId()
                  //             }
                  //           }
                  //         }
                  //       }
                  //     },
                  //     TEXT: reviewComment.getText(),
                  //     TIMESTAMP: new Date()
                  //   }))
                  // }
                }))
              }
            }))
          }
        }))
      }
    }
  }
}

export default DomainOrganizationToPrismaCreateMapper;
