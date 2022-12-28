import { Command } from "commander";
import {
  OrganizationStatsController,
} from "@/infrastructure/controllers";
import TeamOrganizationStatsController from "../controllers/organizationteam-stats.controller";

const createCLI = () => {
  const program = new Command();
  program.version("1.0.0");
  program.name("GitHub Stats");
  program.description("Command line tool to perform Github Stats operations.");

  program
    .command("organization")
    .requiredOption("-n, --name <name>", "Organization name")
    .option("-s, --startDate <startDate>", "Start date in format YYYY-MM-DD")
    .option("-e, --endDate <endDate>", "End date in format YYYY-MM-DD")
    .option("-p, --savePath <savePath>", "Path to save the output file")
    .description("Return organization statistics")
    .action(async (options) => {
      const organizationController = new OrganizationStatsController();
      const startDateObject = options.startDate ? new Date(options.startDate) : null;
      const endDateObject = options.endDate ? new Date(options.endDate) : null;
      try {
        console.log(`Calculating organization stats for ${options.name}...`);
        await organizationController.execute(options.name, startDateObject, endDateObject, options.savePath);
        console.log(`Organization stats saved on path ${options.savePath || './output.csv'}`);
      } catch (error) {
        console.error(error.message);
      }
    });

  program
    .command("organization-team")
    .requiredOption("-n, --name <name>", "Organization name")
    .requiredOption("-t, --team <teamSlug>", "Team slug. E.g. dev-melon")
    .option("-s, --startDate <startDate>", "Start date in format YYYY-MM-DD")
    .option("-e, --endDate <endDate>", "End date in format YYYY-MM-DD")
    .option("-p, --savePath <savePath>", "Path to save the output file")
    .description("Return organization team statistics")
    .action(async (options) => {
      const organizationController = new TeamOrganizationStatsController();
      const startDateObject = options.startDate ? new Date(options.startDate) : null;
      const endDateObject = options.endDate ? new Date(options.endDate) : null;
      const teamSlug = options.team;
      try {
        console.log(`Calculating Organization Team stats for ${options.name}...`);
        await organizationController.execute(options.name, teamSlug, startDateObject, endDateObject, options.savePath);
        console.log(`Organization stats saved on path ${options.savePath || './output.csv'}`);
      } catch (error) {
        console.error(error.message);
      }
    });

  return program;
}

module.exports = createCLI;
