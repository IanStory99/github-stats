const createCLI = require("./cli");

const main = async () => {
  const program = createCLI();
  program.parseAsync(process.argv);
};

main();
