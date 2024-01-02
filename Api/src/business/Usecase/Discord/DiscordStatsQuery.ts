import createHttpError, { HttpError } from 'http-errors';
import { IGlobalStats } from '../../Models/Discord';
import IDiscordRepository from '../../Ports/IDiscordRepository';
import HttpStatusCode from '../../../enums/HttpStatusCode';

export default class DiscordStatsQuery {
  private readonly discordRepository: IDiscordRepository;

  constructor(discordRepository: IDiscordRepository) {
    this.discordRepository = discordRepository;
  }

  async getGlobalStats(): Promise<IGlobalStats | HttpError> {
    const statsQuantity = await this.discordRepository.getStatsQuantity();
    const guildsQuantity = await this.discordRepository.getGuildsQuantity();
    const potentialMembersCount = await this.discordRepository.getPotentialMembersCount();
    const firstStat = await this.discordRepository.getFirstStatDocument();
    const lastStat = await this.discordRepository.getLastStatDocument();

    if (!statsQuantity || !guildsQuantity || !potentialMembersCount || !firstStat || !lastStat) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while getting stats');
    }

    return {
      statsCount: statsQuantity,
      guildsCount: guildsQuantity,
      potentialMembersCount: potentialMembersCount - guildsQuantity,
      firstCreatedAt: firstStat.createdAt,
      lastCreatedAt: lastStat.createdAt,
    };
  }
}
