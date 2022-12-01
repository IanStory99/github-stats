import { NODE_ENV, LOG_FORMAT } from "@/application/config";

class App {
  public env: string;

  constructor() {
    this.env = NODE_ENV || "development";
    this.initializeLogging();
  }

  public run(command: string) {
    // TODO: Deberia correr el comando
    console.log(command);
  }

  private initializeLogging() {
    // TODO: Configurar logger?
    console.log(LOG_FORMAT);
    // this.app.use(morgan(LOG_FORMAT, { stream }));
  }
}

export default App;
