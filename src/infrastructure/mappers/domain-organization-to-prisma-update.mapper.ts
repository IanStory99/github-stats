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
      REPOSITORIES: {
        upsert: organization.getRepositories().map((repository) => ({
          where: {
            ID: repository.getId()
          },
          create: {
            ID: repository.getId(),
            NAME: repository.getName(),
            URL: repository.getUrl(),
            TIMESTAMP: new Date(),
            PULLREQS: {
              connectOrCreate: repository.getPullRequests().map((pullRequest) => ({
                where: {
                  ID: pullRequest.getId()
                },
                create: {
                  ID: pullRequest.getId(),
                  MERGED_AT: pullRequest.getMergedAt(),
                  TIMESTAMP: new Date(),
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
                  // TODO: Add commits
                  // COMMITS: {
                  //   connectOrCreate: pullRequest.getCommits().map((commit) => ({
                  //     where: {
                  //       ID: commit.getId()
                  //     },
                  //     create: {
                  //       ID: commit.getId(),
                  //       TIMESTAMP: new Date(),
                  //       ADDITIONS: commit.getAdditions(),
                  //       DELETIONS: commit.getDeletions(),
                  //       AUTHOR: {
                  //         connectOrCreate: {
                  //           where: {
                  //             ID: commit.getAuthorLogin()
                  //           },
                  //           create: {
                  //             ID: commit.getAuthorLogin(),
                  //             LOGIN: commit.getAuthorLogin(),
                  //             TIMESTAMP: new Date(),
                  //             TEAM: {
                  //               connect: {
                  //                 ID: organization.getTeams()[0].getId() // TODO: Fix this
                  //               }
                  //             },
                  //             ORGANIZATION: {
                  //               connect: {
                  //                 ID: organization.getId()
                  //               }
                  //             }
                  //           }
                  //         }
                  //       }
                  //     },
                  //   }))
                  // },
                  REVIEWS: {
                    connectOrCreate: pullRequest.getReviews().map((review) => ({
                      where: {
                        ID: review.getId()
                      },
                      create: {
                        ID: review.getId(),
                        TIMESTAMP: new Date(),
                        STATE: review.getState(),
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
                        // TODO: Add review comments
                        // REVIEW_COMMENTS: {
                        //   connectOrCreate: review.getReviewComments().map((reviewComment) => ({
                        //     where: {
                        //       ID: reviewComment.getId()
                        //     },
                        //     create: {
                        //       ID: reviewComment.getId(),
                        //       TIMESTAMP: new Date(),
                        //       TEXT: reviewComment.getText(),
                        //       AUTHOR: {
                        //         connectOrCreate: {
                        //           where: {
                        //             ID: reviewComment.getLogin()
                        //           },
                        //           create: {
                        //             ID: reviewComment.getLogin(),
                        //             LOGIN: reviewComment.getLogin(),
                        //             TIMESTAMP: new Date(),
                        //             TEAM: {
                        //               connect: {
                        //                 ID: organization.getTeams()[0].getId() // TODO: Fix this
                        //               }
                        //             },
                        //             ORGANIZATION: {
                        //               connect: {
                        //                 ID: organization.getId()
                        //               }
                        //             }
                        //           }
                        //         }
                        //       }
                        //     }
                        //   }))
                        // }
                      }
                    }))
                  }
                }
              }))
            }
          },
          update: {
            ID: repository.getId(),
            NAME: repository.getName(),
            URL: repository.getUrl(),
            TIMESTAMP: new Date(),
            PULLREQS: {
              connectOrCreate: repository.getPullRequests().map((pullRequest) => ({
                where: {
                  ID: pullRequest.getId()
                },
                create: {
                  ID: pullRequest.getId(),
                  MERGED_AT: pullRequest.getMergedAt(),
                  TIMESTAMP: new Date(),
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
                  // TODO: Add commits
                  // COMMITS: {
                  //   connectOrCreate: pullRequest.getCommits().map((commit) => ({
                  //     where: {
                  //       ID: commit.getId()
                  //     },
                  //     create: {
                  //       ID: commit.getId(),
                  //       TIMESTAMP: new Date(),
                  //       ADDITIONS: commit.getAdditions(),
                  //       DELETIONS: commit.getDeletions(),
                  //       AUTHOR: {
                  //         connectOrCreate: {
                  //           where: {
                  //             ID: commit.getAuthorLogin()
                  //           },
                  //           create: {
                  //             ID: commit.getAuthorLogin(),
                  //             LOGIN: commit.getAuthorLogin(),
                  //             TIMESTAMP: new Date(),
                  //             TEAM: {
                  //               connect: {
                  //                 ID: organization.getTeams()[0].getId() // TODO: Fix this
                  //               }
                  //             },
                  //             ORGANIZATION: {
                  //               connect: {
                  //                 ID: organization.getId()
                  //               }
                  //             }
                  //           }
                  //         }
                  //       }
                  //     },
                  //   }))
                  // },
                  REVIEWS: {
                    connectOrCreate: pullRequest.getReviews().map((review) => ({
                      where: {
                        ID: review.getId()
                      },
                      create: {
                        ID: review.getId(),
                        TIMESTAMP: new Date(),
                        STATE: review.getState(),
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
                        // TODO: Add review comments
                        // REVIEW_COMMENTS: {
                        //   connectOrCreate: review.getReviewComments().map((reviewComment) => ({
                        //     where: {
                        //       ID: reviewComment.getId()
                        //     },
                        //     create: {
                        //       ID: reviewComment.getId(),
                        //       TIMESTAMP: new Date(),
                        //       TEXT: reviewComment.getText(),
                        //       AUTHOR: {
                        //         connectOrCreate: {
                        //           where: {
                        //             ID: reviewComment.getLogin()
                        //           },
                        //           create: {
                        //             ID: reviewComment.getLogin(),
                        //             LOGIN: reviewComment.getLogin(),
                        //             TIMESTAMP: new Date(),
                        //             TEAM: {
                        //               connect: {
                        //                 ID: organization.getTeams()[0].getId() // TODO: Fix this
                        //               }
                        //             },
                        //             ORGANIZATION: {
                        //               connect: {
                        //                 ID: organization.getId()
                        //               }
                        //             }
                        //           }
                        //         }
                        //       }
                        //     }
                        //   }))
                        // }
                      }
                    }))
                  }
                }
              }))
            }
          }
        }))
      }
    };
  }
}

export default DomainOrganizationToPrismaUpdateMapper;
