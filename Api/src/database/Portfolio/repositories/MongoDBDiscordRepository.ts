import mongoose from 'mongoose';
import DBClient from '../../client';
import IDiscordRepository from '../../../business/Ports/IDiscordRepository';
import { IDiscordStats } from '../../../business/Models/DiscordStats';
import DiscordStatsCollection from '../Models/DiscordStats';
import { IDiscordGuilds } from '../../../business/Models/DiscordGuilds';
import DiscordGuildsCollection from '../Models/DiscordGuilds';

export default class MongoDBDiscordRepository implements IDiscordRepository {
  private readonly discordStatsRepository: mongoose.Collection<IDiscordStats>;

  private readonly discordGuildsRepository: mongoose.Collection<IDiscordGuilds>;

  private readonly botDB: DBClient;

  constructor(botDB: DBClient) {
    this.botDB = botDB;

    this.discordStatsRepository = new DiscordStatsCollection(this.botDB).collection;

    this.discordGuildsRepository = new DiscordGuildsCollection(this.botDB).collection;
  }

  async getStatsQuantity(): Promise<number | null> {
    const statsCount = await this.discordStatsRepository.countDocuments();
    return statsCount;
  }

  async getFirstStatDocument(): Promise<IDiscordStats | null> {
    const firstStat = await this.discordStatsRepository.findOne({}, { sort: { createdAt: 1 } });
    return firstStat;
  }

  async getLastStatDocument(): Promise<IDiscordStats | null> {
    const lastStat = await this.discordStatsRepository.findOne({}, { sort: { createdAt: -1 } });
    return lastStat;
  }

  async getGuildsQuantity(): Promise<number | null> {
    const guildsCount = await this.discordGuildsRepository.countDocuments();
    return guildsCount;
  }

  async getPotentialMembersCount(): Promise<number | null> {
    const potentialMembersCount = await this.discordGuildsRepository.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: '$memberCount',
          },
        },
      },
    ]).toArray();

    if (!potentialMembersCount || !potentialMembersCount.length) {
      return null;
    }

    return potentialMembersCount[0].total;
  }
}
