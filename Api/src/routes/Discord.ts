import express from 'express';
import DBClient from '../database/client';
import IDiscordBotRepository from '../business/Ports/IDiscordBotRepository';
import MongoDBDiscordRepository from '../database/Discord/Repositories/MongoDBDiscordRepository';
import DiscordStatsController from '../controllers/DiscordStatsController';
import DiscordStatsQuery from '../business/Usecase/Discord/DiscordStatsQuery';

export default class DiscordBotRoutes {
  public readonly router: express.Router;

  private readonly discordDB: DBClient;

  private readonly discordRepository: IDiscordBotRepository;

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

    this.router.get('/global', controller.getStatsCount.bind(controller));
    this.router.get('/stats', controller.getLastFiveWeeksStats.bind(controller));
  }
}
