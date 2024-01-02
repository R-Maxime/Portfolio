import { Model } from 'mongoose';
import DBClient from '../../client';
import IDiscordRepository from '../../../business/Ports/IDiscordRepository';
import DiscordStatsModel from '../Models/DiscordStats';
import { IDiscordStats } from '../../../business/Models/DiscordStats';

export default class MongoDBDiscordRepository implements IDiscordRepository {
  readonly discordStatsRepository: Model<IDiscordStats>;

  readonly portfolioDB: DBClient;

  constructor(portfolioDB: DBClient) {
    this.portfolioDB = portfolioDB;

    this.discordStatsRepository = new DiscordStatsModel(this.portfolioDB).model;
  }

  async getAllStats(): Promise<IDiscordStats[] | null> {
    const stats = await this.discordStatsRepository.find();
    return stats;
  }
}
