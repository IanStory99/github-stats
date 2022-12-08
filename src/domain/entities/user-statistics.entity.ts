class UserStatisticsEntity {
  private userId: string;
  private statistics: Record<string, number>;

  constructor(userId: string, statistics: Record<string, number> = {}) {
    this.userId = userId;
    this.statistics = statistics;
  }

  getUserId(): string {
    return this.userId;
  }

  getStatistics(): Record<string, number> {
    return this.statistics;
  }

  addStatistic(statisticCode: string, statisticValue: number): void {
    this.statistics[statisticCode] = statisticValue;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  setStatistics(statistics: Record<string, number>): void {
    this.statistics = statistics;
  }
}

export default UserStatisticsEntity;
