const { Command } = require("commander");
const { UserStatsController } = require("../../infrastructure/controllers/user-stats.controller");

const createCLI = () => {
  const program = new Command();
  program.version("1.0.0");
  program.name("GitHub Stats");
  program.description("Command line tool to perform Github Stats operations.");


  program
    .command("user-stats")
    .description(
      "Return all user data"
    )
    .action((argv) => {
      const controller = new UserStatsController();
      return controller.execute(argv[0], argv[1], argv[2]);
    });

  return program;
}

module.exports = createCLI;
