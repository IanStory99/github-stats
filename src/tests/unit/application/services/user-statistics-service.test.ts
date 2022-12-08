import { UserStatisticsService } from "@/application/services";

describe("UserStatisticsService", () => {
  describe("getOrganizationUsersStatistics", () => {
    it("should return an array of UserStatisticsEntity", () => {
      // Arrange
      const statistics = [
        {
          getStatisticCode: () => "statisticCode",
          calculate: () => ({
            "userId": 1
          })
        }
      ];
      const userStatisticsService = new UserStatisticsService(statistics);

      // Act
      const result = userStatisticsService.getOrganizationUsersStatistics({} as any);

      // Assert
      expect(result).toEqual([{
        "getUserId": expect.any(Function),
        "getStatistics": expect.any(Function),
        "addStatistic": expect.any(Function),
        "statistics": {
          "statisticCode": 1
        },
        "userId": "userId"
      }]);
    });

    it("should return an array of UserStatisticsEntity with the correct userId", () => {
      // Arrange
      const statistics = [
        {
          getStatisticCode: () => "statisticCode",
          calculate: () => ({
            "userId": 1
          })
        }
      ];
      const userStatisticsService = new UserStatisticsService(statistics);

      // Act
      const result = userStatisticsService.getOrganizationUsersStatistics({} as any);

      // Assert
      expect(result[0].getUserId()).toEqual("userId");
    });

    it("should return an array of UserStatisticsEntity with the correct statistics", () => {
      // Arrange
      const statistics = [
        {
          getStatisticCode: () => "statisticCode",
          calculate: () => ({
            "userId": 1
          })
        }
      ];
      const userStatisticsService = new UserStatisticsService(statistics);

      // Act
      const result = userStatisticsService.getOrganizationUsersStatistics({} as any);

      // Assert
      expect(result[0].getStatistics()).toEqual({
        "statisticCode": 1
      });
    });

    it("should return an array of UserStatisticsEntity with the correct statistics when there are multiple statistics", () => {
      // Arrange
      const statistics = [
        {
          getStatisticCode: () => "statisticCode",
          calculate: () => ({
            "userId": 1
          })
        },
        {
          getStatisticCode: () => "statisticCode2",
          calculate: () => ({
            "userId": 2
          })
        }
      ];
      const userStatisticsService = new UserStatisticsService(statistics);

      // Act
      const result = userStatisticsService.getOrganizationUsersStatistics({} as any);

      // Assert
      expect(result[0].getStatistics()).toEqual({
        "statisticCode": 1,
        "statisticCode2": 2
      });
    });

    it("should return an array of UserStatisticsEntity with the correct statistics when there are multiple users", () => {
      // Arrange
      const statistics = [
        {
          getStatisticCode: () => "statisticCode",
          calculate: () => ({
            "userId": 1,
            "userId2": 2
          })
        }
      ];
      const userStatisticsService = new UserStatisticsService(statistics);

      // Act
      const result = userStatisticsService.getOrganizationUsersStatistics({} as any);

      // Assert
      expect(result[0].getStatistics()).toEqual({
        "statisticCode": 1
      });
      expect(result[1].getStatistics()).toEqual({
        "statisticCode": 2
      });
    });
  });
});