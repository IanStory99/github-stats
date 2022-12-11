import { FormattingService } from "@/application/services";

describe("FormattingService", () => {
  it("should be able to format a value", () => {
    const formatter = {
      format: jest.fn().mockReturnValue({
        formatType: "csv",
        formatData: "data",
        saveToFileFunction: jest.fn(),
      }),
    };
    const formattingService = new FormattingService(formatter);
    const value = {
      organization1: {
        team1: {
          member1: {
            stat1: "value1",
            stat2: "value2",
          },
          member2: {
            stat1: "value1",
            stat2: "value2",
          },
        },
        team2: {
          member3: {
            stat1: "value1",
            stat2: "value2",
          },
        },
      },
    };
    const result = formattingService.format(value);
    expect(result).toEqual({
      formatType: "csv",
      formatData: "data",
      saveToFileFunction: expect.any(Function),
    });
  });
});
