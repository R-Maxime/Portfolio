import express, { Express } from 'express';
import AppConfig from './AppConfig';
import Logger from './utils/Logger';
import NodeEnvEnum from './enums/NodeEnvEnum';

class App {
  private readonly expressApp: Express;

  private readonly API_PORT: Number;

  constructor() {
    this.API_PORT = Number(process.env.API_PORT) || 3000;

    this.expressApp = express();

    this.setup();
  }

  async setup(): Promise<void> {
    await new AppConfig(this.expressApp).setup();
    this.startServer();
  }

  private startServer(): void {
    this.expressApp.listen(this.API_PORT, () => {
      if (process.env.NODE_ENV === NodeEnvEnum.PRODUCTION) {
        Logger.log(`I am running at ${process.env.API_URL}:${this.API_PORT}`);
        return;
      }

      Logger.log(`I am running at ${process.env.API_URL}`);
    });
  }
}

new App();
