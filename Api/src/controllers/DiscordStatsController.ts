import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatusCode';
import DiscordStatsQuery from '../business/Usecase/Discord/DiscordStatsQuery';
import Logger from '../utils/Logger';
import IGlobalStats, { IInteractionStatsByWeekOnLastFiveWeeks } from '../business/Models/Discord';

const cache: { globalStats: IGlobalStats | null, lastFiveWeeksStats: IInteractionStatsByWeekOnLastFiveWeeks[] | null, totalAlmanaxServersCount: number | null } = { globalStats: null, lastFiveWeeksStats: null, totalAlmanaxServersCount: null };

export default class DiscordStatsController {
  private readonly discordStatsQuery: DiscordStatsQuery;

  private readonly cacheDuration = 1000 * 60;

  constructor(discordStatsQuery: DiscordStatsQuery) {
    this.discordStatsQuery = discordStatsQuery;
  }

  public async getStatsCount(req: Request, res: Response): Promise<Response> {
    try {
      if (cache.globalStats) {
        return res.status(HttpStatusCode.OK).json(cache.globalStats);
      }

      const stats = await this.discordStatsQuery.getGlobalStats();
      cache.globalStats = stats;

      setTimeout(() => { cache.globalStats = null; }, this.cacheDuration);
      return res.status(HttpStatusCode.OK).json(stats);
    } catch (error) {
      Logger.error('Error while getting stats', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting stats', error });
    }
  }

  public async getLastFiveWeeksStats(req: Request, res: Response): Promise<Response> {
    try {
      if (cache.lastFiveWeeksStats) {
        return res.status(HttpStatusCode.OK).json(cache.lastFiveWeeksStats);
      }

      const stats = await this.discordStatsQuery.getLastFiveWeeksStats();

      cache.lastFiveWeeksStats = stats;
      setTimeout(() => { cache.lastFiveWeeksStats = null; }, this.cacheDuration);

      return res.status(HttpStatusCode.OK).json(stats);
    } catch (error) {
      Logger.error('Error while getting stats', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting stats', error });
    }
  }

  public async getTotalAlmanaxServersCount(req: Request, res: Response): Promise<Response> {
    try {
      if (cache.totalAlmanaxServersCount) {
        return res.status(HttpStatusCode.OK).json({ count: cache.totalAlmanaxServersCount });
      }

      const count = await this.discordStatsQuery.getTotalAlmanaxServersCount();

      cache.totalAlmanaxServersCount = count;
      setTimeout(() => { cache.totalAlmanaxServersCount = null; }, this.cacheDuration);

      return res.status(HttpStatusCode.OK).json({ count });
    } catch (error) {
      Logger.error('Error while getting count', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting count', error });
    }
  }
}
