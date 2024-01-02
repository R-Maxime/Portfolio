import createHttpError, { HttpError } from 'http-errors';
import { IDiscordStats } from '../../../Models/DiscordStats';
import IDiscordRepository from '../../../Ports/IDiscordRepository';
import HttpStatusCode from '../../../../enums/HttpStatusCode';

export default class DiscordStatsQuery {
  private readonly discordRepository: IDiscordRepository;

  constructor(discordRepository: IDiscordRepository) {
    this.discordRepository = discordRepository;
  }

  async getAllStats(): Promise<IDiscordStats[] | HttpError> {
    const stats = await this.discordRepository.getAllStats();

    if (!stats) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while getting stats');
    }

    return stats;
  }
}
