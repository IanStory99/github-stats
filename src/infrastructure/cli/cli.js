#!/usr/bin/env node
const { Command } = require("commander");

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
    .action(() => {
      console.log('Testing')
    });

    return program;
}

module.exports = createCLI;
