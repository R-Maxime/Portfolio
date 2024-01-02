import express from 'express';
import DBClient from '../database/client';
import IDiscordRepository from '../business/Ports/IDiscordRepository';
import MongoDBDiscordRepository from '../database/Portfolio/repositories/MongoDBDiscordRepository';
import DiscordStatsController from '../controllers/DiscordStatsController';
import DiscordStatsQuery from '../business/Usecase/Discord/Stats/DiscordStatsQuery';

export default class DiscordRoutes {
  private readonly router: express.Router;

  private readonly discordDB: DBClient;

  private readonly discordRepository: IDiscordRepository;

  constructor(discordDB: DBClient) {
    this.router = express.Router();
    this.discordDB = discordDB;
    this.discordRepository = new MongoDBDiscordRepository(this.discordDB);
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const controller = new DiscordStatsController(
      new DiscordStatsQuery(this.discordRepository),
    );

    this.router.get('/', controller.getStats.bind(controller));
  }

  get Router(): express.Router {
    return this.router;
  }
}
