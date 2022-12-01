import App from "@/application/app";
import validateEnv from "@/infrastructure/utils/validateEnv";

validateEnv();

const app = new App();
app.run("command");
