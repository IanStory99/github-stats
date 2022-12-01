import App from "@/application/app";
import validateEnv from "@/infrastructure/utils/validatenv.util";

validateEnv();

const app = new App();
app.run("command");
