const createCLI = require("../../../../infrastructure/cli/cli");

describe("CLI Testing", () => {
  let mockExit;
  let mockStdout;

  beforeEach(() => {
    mockExit = jest.spyOn(process, "exit").mockImplementation();
    mockStdout = jest
      .spyOn(process.stdout, "write")
      .mockImplementation(() => {});
  });
  afterEach(() => {
    mockExit.mockClear();
    mockStdout.mockClear();
  });

  it("should return help options with --help", () => {
    const program = createCLI();
    program.exitOverride();
    expect(() => {
      program.parse(["npm run", "cli", "--help"]);
    }).toThrow("(outputHelp)");
  });

  it("should throw error when command does not exist", () => {
    const program = createCLI();
    program.exitOverride();
    expect(() => {
      program.parse(["npm run", "cli", "fake-cmd"]);
    }).toThrow("error: unknown command 'fake-cmd'");
  });
});
