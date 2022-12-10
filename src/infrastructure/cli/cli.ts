import OrganizationPOCController from "@/infrastructure/controllers/organization-poc.controller";

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

  return program;
}

module.exports = createCLI;
