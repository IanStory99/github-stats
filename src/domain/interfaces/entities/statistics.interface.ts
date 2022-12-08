import { OrganizationEntity } from "@/domain/entities";

interface StatisticsInterface {
  getStatisticCode(): string;
  calculate(organization: OrganizationEntity): Record<string, number>;
}

export default StatisticsInterface;
