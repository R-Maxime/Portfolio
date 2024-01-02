import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import HttpStatusCode from '../enums/HttpStatusCode';
import DiscordStatsQuery from '../business/Usecase/Discord/Stats/DiscordStatsQuery';

export default class DiscordStatsController {
  constructor(
    private readonly discordStatsQuery: DiscordStatsQuery,
  ) { }

  async getStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await this.discordStatsQuery.getAllStats();

      if (stats instanceof HttpError) {
        return res.status(stats.statusCode).json({ error: stats.message });
      }

      return res.status(HttpStatusCode.OK).json(stats);
    } catch (error) {
      console.error('Error while getting stats', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting stats', error });
    }
  }
}
