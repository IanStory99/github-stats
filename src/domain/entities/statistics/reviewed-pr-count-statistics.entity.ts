import { StatisticsInterface } from "@/domain/interfaces/entities";

class ReviewedPRCountStatisticsEntity implements StatisticsInterface {
  calculate(organization: OrganizationEntity) {
    // ...
  }
}

export default ReviewedPRCountStatisticsEntity;
