import OrganizationEntity from '@/domain/entities/organization.entity';
import UserStatisticsEntity from '@/domain/entities/user-statistics.entity';
import StatisticsInterface from '@/domain/interfaces/entities/statistics.interface';

interface UserStatisticsServiceInterface {
  new(statistics: StatisticsInterface[]);
  getOrganizationUsersStatistics(organization: OrganizationEntity): UserStatisticsEntity[];
  // getUserOrganizationsStatistics(username: string, organizations: OrganizationEntity[]): UserStatisticsEntity;
}

export default UserStatisticsServiceInterface;
