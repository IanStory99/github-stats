const createCLIProgram = require("./cli.ts");

const main = async () => {
  const program = createCLIProgram();
  program.parseAsync(process.argv);
};

main();
