import { StatisticsInterface } from "@/domain/interfaces/entities";
import { OrganizationEntity } from "@/domain/entities";

class CodeDiffCountStatisticsEntity implements StatisticsInterface {
  calculate(organization: OrganizationEntity) {
    // ...
  }
}

export default CodeDiffCountStatisticsEntity;
