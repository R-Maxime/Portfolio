import express, { Express } from 'express';
import dotenv from 'dotenv';
import AppConfig from './AppConfig';
import DBClient from './database/client';

class App {
  private readonly expressApp: Express;

  private readonly API_PORT: Number;

  private readonly portfolioDB: DBClient;

  private readonly botDB: DBClient;

  constructor() {
    dotenv.config();

    this.API_PORT = Number(process.env.API_PORT) || 3000;

    this.expressApp = express();

    this.startServer();

    this.portfolioDB = new DBClient(process.env.DB_NAME as string);
    this.botDB = new DBClient(process.env.DB_SECOND_NAME as string);

    new AppConfig(this.expressApp, this.portfolioDB, this.botDB);
  }

  private startServer(): void {
    this.expressApp.listen(this.API_PORT, () => {
      console.info(`[Server]: I am running at http://localhost:${this.API_PORT}`);
    });
  }
}

new App();
