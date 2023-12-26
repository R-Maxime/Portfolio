import express, { Express } from 'express';
import dotenv from 'dotenv';
import AppConfig from './AppConfig';

class App {
  private readonly expressApp: Express;

  private readonly API_PORT: Number;

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
      console.info(`[Server]: I am running at http://localhost:${this.API_PORT}`);
    });
  }
}

new App();
