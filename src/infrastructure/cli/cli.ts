import { Command } from "commander";
import {
  OrganizationStatsController,
  OrganizationPOCController
} from "@/infrastructure/controllers";

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
    .requiredOption("-n, --name <name>", "Organization name")
    .option("-s, --startDate <startDate>", "Start date in format YYYY-MM-DD")
    .option("-e, --endDate <endDate>", "End date in format YYYY-MM-DD")
    .description("Return organization statistics")
    .action(async (options) => {
      const organizationController = new OrganizationStatsController();
      const startDateObject = options.startDate ? new Date(options.startDate) : null;
      const endDateObject = options.endDate ? new Date(options.endDate) : null;
      try {
        console.log(`Calculating organization stats for ${options.name}...`);
        await organizationController.execute(options.name, startDateObject, endDateObject);
        console.log("Organization stats saved in file 'output.csv'");
      } catch (error) {
        console.error(error.message);
      }
    });

  return program;
}

module.exports = createCLI;
