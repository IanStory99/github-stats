import { CSVFormatter } from "@/domain/entities";

describe("CSVFormatter", () => {
  it("should be able to format a value", () => {
    const formatter = new CSVFormatter();
    const value = [{
      "organization1": {
        "team1": {
          "member1": {
            "stat1": "value1",
            "stat2": "value2"
          },
          "member2": {
            "stat1": "value1",
            "stat2": "value2"
          },
        },
        "team2": {
          "member3": {
            "stat1": "value1",
            "stat2": "value2"
          },
        }
      }
    }];
    const result = formatter.format(value);
    expect(result).toEqual({
      "formatType": "csv",
      "formatData": "\"organization1.team1.member1.stat1\",\"organization1.team1.member1.stat2\",\"organization1.team1.member2.stat1\",\"organization1.team1.member2.stat2\",\"organization1.team2.member3.stat1\",\"organization1.team2.member3.stat2\"\n\"value1\",\"value2\",\"value1\",\"value2\",\"value1\",\"value2\"",
      "saveToFileFunction": expect.any(Function)
    });
  });
});
