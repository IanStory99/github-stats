import { OrganizationEntity } from "@/domain/entities";

interface StatisticsInterface {
  calculate(organization: OrganizationEntity);
}

export default StatisticsInterface;
