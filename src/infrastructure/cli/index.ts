import * as dotenv from 'dotenv';
dotenv.config();

const createCLIProgram = require("./cli");

const main = async () => {
  const program = createCLIProgram();
  program.parseAsync(process.argv);
};

main();
