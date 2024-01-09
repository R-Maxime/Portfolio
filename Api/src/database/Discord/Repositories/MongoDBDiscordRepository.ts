import mongoose from 'mongoose';
import DBClient from '../../client';
import IDiscordBotRepository from '../../../business/Ports/IDiscordBotRepository';
import DiscordStatsCollection from '../Collections/DiscordStats';
import DiscordGuildsCollection from '../Collections/DiscordGuilds';
import { IDiscordStats } from '../../../business/Models/DiscordStats';
import { IDiscordGuilds } from '../../../business/Models/DiscordGuilds';
import { IInteractionStatsByWeekOnLastMonth } from '../../../business/Models/Discord';

export default class MongoDBDiscordRepository implements IDiscordBotRepository {
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

  async getInteractionsStatsByWeekOnLastMonth(): Promise<IInteractionStatsByWeekOnLastMonth[] | null> {
    const stats = await this.discordStatsRepository.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%U',
              date: '$createdAt',
            },
          },
          count: {
            $sum: 1,
          },
          startOfWeek: {
            $first: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
              },
            },
          },
          endOfWeek: {
            $last: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$createdAt',
              },
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          week: '$_id',
          count: 1,
          startOfWeek: 1,
          endOfWeek: 1,
        },
      },
    ]).toArray() as IInteractionStatsByWeekOnLastMonth[];

    if (!stats || !stats.length) {
      return null;
    }

    return stats;
  }
}
