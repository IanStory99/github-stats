import { StatisticsInterface } from "@/domain/interfaces/entities";

class CommitCountStatisticsEntity implements StatisticsInterface {
  calculate(organization: OrganizationEntity) {
    // ...
  }
}

export default CommitCountStatisticsEntity;
