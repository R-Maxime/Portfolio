import createHttpError, { HttpError } from 'http-errors';
import { IGlobalStats, IInteractionStatsByWeekOnLastFiveWeeks } from '../../Models/Discord';
import IDiscordBotRepository from '../../Ports/IDiscordBotRepository';
import HttpStatusCode from '../../../enums/HttpStatusCode';
import { IDiscordStats } from '../../Models/DiscordStats';

export default class DiscordStatsQuery {
  private readonly discordRepository: IDiscordBotRepository;

  constructor(discordRepository: IDiscordBotRepository) {
    this.discordRepository = discordRepository;
  }

  async getGlobalStats(): Promise<IGlobalStats> {
    const statsQuantity = await this.discordRepository.getStatsQuantity() ?? 0;
    const guildsQuantity = await this.discordRepository.getGuildsQuantity() ?? 0;
    const potentialMembersCount = await this.discordRepository.getPotentialMembersCount() ?? 0;
    const firstStat = await this.discordRepository.getFirstStatDocument() ?? {} as IDiscordStats;
    const lastStat = await this.discordRepository.getLastStatDocument() ?? {} as IDiscordStats;

    return {
      statsCount: statsQuantity,
      guildsCount: guildsQuantity,
      potentialMembersCount: potentialMembersCount - guildsQuantity,
      firstCreatedAt: firstStat?.createdAt,
      lastCreatedAt: lastStat?.createdAt,
    };
  }

  async getLastFiveWeeksStats(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[] | HttpError> {
    const stats = await this.discordRepository.getInteractionsStatsByWeekOnLastFiveWeeks();

    if (!stats) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while getting stats');
    }

    return stats;
  }
}
