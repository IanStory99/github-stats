import { Command } from "commander";
import {
  OrganizationStatsController,
  OrganizationTeamStatsController
} from "@/infrastructure/controllers";
import { spinnerError, spinnerSuccess, stopSpinner, updateSpinnerText } from "./spinner";

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
      updateSpinnerText(`Calculating organization stats for ${options.name}`);
      const organizationController = new OrganizationStatsController();
      const startDateObject = options.startDate ? new Date(options.startDate) : null;
      const endDateObject = options.endDate ? new Date(options.endDate) : null;
      try {
        await organizationController.execute(options.name, startDateObject, endDateObject, options.savePath);
        spinnerSuccess();
        console.log(`Organization stats saved on path ${options.savePath || './output.csv'}`);
      } catch (error) {
        spinnerError(`Has been an error with the organization ${options.name}:\n** ${error.message}`);
        stopSpinner();
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
      updateSpinnerText(`Calculating Organization Team stats for ${options.name}`);
      const organizationController = new OrganizationTeamStatsController();
      const startDateObject = options.startDate ? new Date(options.startDate) : null;
      const endDateObject = options.endDate ? new Date(options.endDate) : null;
      const teamSlug = options.team;
      try {
        await organizationController.execute(options.name, teamSlug, startDateObject, endDateObject, options.savePath);
        spinnerSuccess();
        console.log(`Team stats saved on path ${options.savePath || './output.csv'}`);
      } catch (error) {
        spinnerError(`Has been an error with the team ${options.name}:\n** ${error.message}`);
        stopSpinner();
      }
    });

  return program;
}

module.exports = createCLI;
