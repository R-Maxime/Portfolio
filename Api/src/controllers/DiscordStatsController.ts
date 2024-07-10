import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatusCode';
import DiscordStatsQuery from '../business/Usecase/Discord/DiscordStatsQuery';
import Logger from '../utils/Logger';

export default class DiscordStatsController {
  private readonly discordStatsQuery: DiscordStatsQuery;

  constructor(discordStatsQuery: DiscordStatsQuery) {
    this.discordStatsQuery = discordStatsQuery;
  }

  public async getStatsCount(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await this.discordStatsQuery.getGlobalStats();
      return res.status(HttpStatusCode.OK).json(stats);
    } catch (error) {
      Logger.error('Error while getting stats', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting stats', error });
    }
  }

  public async getLastFiveWeeksStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await this.discordStatsQuery.getLastFiveWeeksStats();
      return res.status(HttpStatusCode.OK).json(stats);
    } catch (error) {
      Logger.error('Error while getting stats', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting stats', error });
    }
  }
}
