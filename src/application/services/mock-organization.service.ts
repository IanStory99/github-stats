import {
  OrganizationEntity,
  RepositoryEntity,
  PullRequestEntity,
  CommitEntity,
  ReviewEntity,
  ReviewCommentEntity,
  TeamEntity,
  UserEntity
} from "@/domain/entities";

class MockOrganizationService {
  public getOrganization(organizationName: string, startDate: Date, endDate: Date): OrganizationEntity {
    return new OrganizationEntity(
      organizationName,
      "Microsoft",
      [
        new RepositoryEntity(
          "Microsoft/TypeScript",
          organizationName,
          "TypeScript",
          "TypeScript",
          [
            new PullRequestEntity(
              "Microsoft/TypeScript#1",
              "Microsoft/TypeScript",
              "IanStory99",
              [
                new CommitEntity(
                  "12345",
                  "IanStory99",
                  "Microsoft/TypeScript#1",
                  350,
                  100
                ),
                new CommitEntity(
                  "67890",
                  "IanStory99",
                  "Microsoft/TypeScript#1",
                  50,
                  90
                )
              ],
              [
                new ReviewEntity(
                  "12345",
                  "Microsoft/TypeScript#1",
                  "IanStory99",
                  "APPROVED",
                  [
                    new ReviewCommentEntity(
                      "12345",
                      "Microsoft/TypeScript#1",
                      "IanStory99",
                      "This is a comment"
                    ),
                    new ReviewCommentEntity(
                      "67890",
                      "Microsoft/TypeScript#1",
                      "IanStory99",
                      "This is a comment 2"
                    ),
                  ]
                ),
                new ReviewEntity(
                  "67890",
                  "Microsoft/TypeScript#1",
                  "IanStory99",
                  "APPROVED",
                  []
                )
              ],
              new Date("2020-01-01"),
              new Date("2020-01-02"),
              new Date("2020-01-02")
            )
          ]
        )
      ],
      [
        new TeamEntity(
          "12345",
          organizationName,
          "Team 1",
          "Slug 1",
          [
            new UserEntity(
              "IanStory99",
              "IanStory99",
              []
            )
          ]
        )
      ]
    );
  }
}

export default MockOrganizationService;
