import { StatisticsInterface } from "@/domain/interfaces/entities";
import { OrganizationEntity } from "@/domain/entities";

class ReviewedPRCountStatisticsEntity implements StatisticsInterface {
  calculate(organization: OrganizationEntity) {
    // ...
  }
}

export default ReviewedPRCountStatisticsEntity;
