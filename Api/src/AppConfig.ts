import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import NodeEnvEnum from './enums/NodeEnvEnum';
import DBClient from './database/client';
import UserRoutes from './routes/User';

export default class AppConfig {
  private readonly expressApp: Express;

  private readonly portfolioDB: DBClient;

  private readonly botDB: DBClient;

  constructor(expressApp: Express, portfolioDB: DBClient, botDB: DBClient) {
    this.expressApp = expressApp;
    this.portfolioDB = portfolioDB;
    this.botDB = botDB;
    this.setupMiddleware();
    this.setupRoutes();
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

  private setupMiddleware(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.use(helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    this.setupRateLimit();

    this.expressApp.use((req: Request, res: Response, next) => {
      console.info(`[Server]: ${req.method} ${req.path}`);
      next();
    });

    this.expressApp.use('/public', express.static('public'));
  }

  private setupRoutes(): void {
    this.expressApp.use('/auth', new UserRoutes(this.portfolioDB).getRouter());
  }
}
