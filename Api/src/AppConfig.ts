import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import fs from 'fs';
import NodeEnvEnum from './enums/NodeEnvEnum';
import DBClient from './database/client';
import UserRoutes from './routes/User';
import WorksRoutes from './routes/Work';
import DiscordRoutes from './routes/Discord';

export default class AppConfig {
  private readonly expressApp: Express;

  private readonly portfolioDB = new DBClient(process.env.DB_NAME as string);

  private readonly botDB = new DBClient(process.env.DB_SECOND_NAME as string);

  constructor(expressApp: Express) {
    this.expressApp = expressApp;
  }

  async setup(): Promise<void> {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    this.setupMiddleware();
    await this.connectDBs();
    await this.setupRoutes();
  }

  private setupRateLimit(): void {
    if (process.env.NODE_ENV === NodeEnvEnum.DEBUG || process.env.NODE_ENV === NodeEnvEnum.TEST) {
      return;
    }

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });

    this.expressApp.use(limiter);
  }

  private logRequests(): void {
    this.expressApp.use((req: Request, res: Response, next) => {
      console.info(`[Server]: ${req.method} ${req.path}`);
      next();
    });
  }

  private setupMiddleware(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.use(helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    this.expressApp.disable('x-powered-by');
    this.setupRateLimit();
    this.logRequests();
  }

  private async connectDBs(): Promise<void> {
    await this.portfolioDB.connect();
    await this.botDB.connect();
  }

  private async setupRoutes(): Promise<void> {
    this.expressApp.use('/public', express.static('public'));
    this.expressApp.use('/auth', new UserRoutes(this.portfolioDB).Router);
    this.expressApp.use('/work', new WorksRoutes(this.portfolioDB).Router);
    this.expressApp.use('/discord', new DiscordRoutes(this.botDB).Router);
  }
}
