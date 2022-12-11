import { UserStatisticsEntity } from "@/domain/entities";

describe("UserStatisticsEntity", () => {
  describe("addStatistic", () => {
    it("should add a statistic to the statistics object", () => {
      const userStatistics = new UserStatisticsEntity("userId");

      userStatistics.addStatistic("statisticCode", 10);

      expect(userStatistics.getStatistics()).toEqual({
        statisticCode: 10,
      });
    });
  });
});
