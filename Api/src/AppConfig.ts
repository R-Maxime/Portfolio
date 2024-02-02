import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import DBClient from './database/client';
import UserRoutes from './routes/User';
import WorksRoutes from './routes/Work';
import DiscordBotRoutes from './routes/Discord';
import Logger from './utils/Logger';
import ContactRoute from './routes/Contact';

export default class AppConfig {
  private readonly expressApp: Express;

  private readonly BOT_DB_ACTIVE: boolean = process.env.BOT_DB_ACTIVE === 'true';

  private readonly portfolioDB = new DBClient(process.env.DB_NAME as string);

  private readonly botDB = new DBClient(process.env.BOT_DB_NAME as string);

  private readonly publicPath = process.env.PUBLIC_PATH || 'public';

  constructor(expressApp: Express) {
    this.expressApp = expressApp;
  }

  async setup(): Promise<void> {
    if (!fs.existsSync(this.publicPath)) {
      fs.mkdirSync(this.publicPath);
    }
    this.setupMiddleware();
    await this.connectDBs();
    await this.setupRoutes();
  }

  private logRequests(): void {
    this.expressApp.use((req: Request, res: Response, next) => {
      Logger.log(`${req.method} ${req.url}`);
      next();
    });
  }

  private setupMiddleware(): void {
    this.expressApp.use(express.json({ limit: '50mb' }));
    this.expressApp.use(cors());
    this.expressApp.use(helmet({
      crossOriginResourcePolicy: false,
    }));
    this.expressApp.disable('x-powered-by');
    this.logRequests();
  }

  private async connectDBs(): Promise<void> {
    await this.portfolioDB.connect();
    if (this.BOT_DB_ACTIVE) {
      await this.botDB.connect();
    }
  }

  private async setupRoutes(): Promise<void> {
    this.expressApp.use('/public', express.static(this.publicPath));
    this.expressApp.use('/auth', new UserRoutes(this.portfolioDB).Router);
    this.expressApp.use('/work', new WorksRoutes(this.portfolioDB).Router);
    this.expressApp.use('/contact', new ContactRoute().Router);
    if (this.BOT_DB_ACTIVE) {
      this.expressApp.use('/discord', new DiscordBotRoutes(this.botDB).Router);
    }
  }
}
