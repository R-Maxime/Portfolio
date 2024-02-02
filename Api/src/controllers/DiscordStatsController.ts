import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import HttpStatusCode from '../enums/HttpStatusCode';
import DiscordStatsQuery from '../business/Usecase/Discord/DiscordStatsQuery';
import Logger from '../utils/Logger';

export default class DiscordStatsController {
  constructor(
    private readonly discordStatsQuery: DiscordStatsQuery,
  ) { }

  async getStatsCount(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await this.discordStatsQuery.getGlobalStats();

      if (stats instanceof HttpError) {
        return res.status(stats.statusCode).json({ error: stats.message });
      }

      return res.status(HttpStatusCode.OK).json(stats);
    } catch (error) {
      Logger.error('Error while getting stats', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting stats', error });
    }
  }

  async getLastMonthStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await this.discordStatsQuery.getLastMonthStats();

      if (stats instanceof HttpError) {
        return res.status(stats.statusCode).json({ error: stats.message });
      }

      return res.status(HttpStatusCode.OK).json(stats);
    } catch (error) {
      Logger.error('Error while getting stats', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting stats', error });
    }
  }
}
