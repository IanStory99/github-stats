import { CSVFormatter } from "@/domain/entities";

describe("CSVFormatter", () => {
  it("should be able to format a value", () => {
    const formatter = new CSVFormatter();
    const value = [
      {
        "username": "user1",
        "team": "team1",
        "stats": {
          "total": 1,
          "totalTime": 2
        }
      },
      {
        "username": "user2",
        "team": "team2",
        "stats": {
          "total": 30,
          "totalTime": 22
        }
      }
    ];
    const result = formatter.format(value);
    expect(result).toEqual({
      "formatType": "csv",
      "formatData": "\"username\",\"team\",\"stats.total\",\"stats.totalTime\"\n\"user1\",\"team1\",1,2\n\"user2\",\"team2\",30,22",
      "saveToFileFunction": expect.any(Function)
    });
  });
});
