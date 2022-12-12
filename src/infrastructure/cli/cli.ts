import OrganizationPOCController from "@/infrastructure/controllers/organization-poc.controller";
import OrganizationStatsController from "@/infrastructure/controllers/organization-stats.controller";

const { Command } = require("commander");

const createCLI = () => {
  const program = new Command();
  program.version("1.0.0");
  program.name("GitHub Stats");
  program.description("Command line tool to perform Github Stats operations.");


  program
    .command("organization-test")
    .description(
      "Return all user data"
    )
    .action(async () => {
      const organizationController = new OrganizationPOCController();
      const result = await organizationController.execute(process.env.ORGANIZATION_ID);
      console.log(result);
    });

  program
    .command("organization")
    .description(
      "Return organization statistics"
    )
    .action(() => {
      const organizationController = new OrganizationStatsController();
      organizationController.execute("microsoft", new Date("2020-01-01"), new Date("2020-12-31"));
      console.log("Organization stats saved in file 'output.csv'");
    });

  return program;
}

module.exports = createCLI;
