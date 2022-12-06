import { StatisticsInterface } from "@/domain/interfaces/entities";

class ExecutedPRCountStatisticsEntity implements StatisticsInterface {
  calculate(organization: OrganizationEntity) {
    // ...
  }
}

export default ExecutedPRCountStatisticsEntity;
