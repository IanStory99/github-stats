import OrganizationEntity from '@/domain/entities/organization.entity';
import UserStatisticsEntity from '@/domain/entities/user-statistics.entity';

interface UserStatisticsServiceInterface {
  getOrganizationUsersStatistics(organization: OrganizationEntity): UserStatisticsEntity[];
  // getUserOrganizationsStatistics(username: string, organizations: OrganizationEntity[]): UserStatisticsEntity;
}

export default UserStatisticsServiceInterface;
