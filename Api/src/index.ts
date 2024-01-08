import express, { Express } from 'express';
import dotenv from 'dotenv';
import AppConfig from './AppConfig';
import Logger from './utils/Logger';
import NodeEnvEnum from './enums/NodeEnvEnum';

class App {
  private readonly expressApp: Express;

  private readonly API_PORT: Number;

  private logger = new Logger();

  constructor() {
    dotenv.config();

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
        this.logger.log('Express', `I am running at ${process.env.API_URL}:${this.API_PORT}`);
        return;
      }

      this.logger.log('Express', `I am running at ${process.env.API_URL}`);
    });
  }
}

new App();
