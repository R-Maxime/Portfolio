/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import DBClient from '../../client';
import IDiscordBotRepository from '../../../business/Ports/IDiscordBotRepository';
import DiscordStatsCollection from '../Collections/DiscordStats';
import DiscordGuildsCollection from '../Collections/DiscordGuilds';
import IDiscordStats from '../../../business/Models/DiscordStats';
import IDiscordGuilds from '../../../business/Models/DiscordGuilds';
import { IInteractionStatsByWeekOnLastFiveWeeks } from '../../../business/Models/Discord';
import Logger from '../../../utils/Logger';
import { IDBMessageStats } from '../../../business/Models/MessageStats';
import MessageStatsCollection from '../Collections/MessageStats';
import { ModulesTypesEnum } from '../../../business/Models/ModuleChannel';
import ModuleChannelsCollection from '../Collections/ModuleChannels';

export default class MongoDBDiscordRepository implements IDiscordBotRepository {
  private readonly discordStatsRepository: mongoose.mongo.Collection<IDiscordStats>;

  private readonly discordGuildsRepository: mongoose.mongo.Collection<IDiscordGuilds>;

  private readonly discordMessageStatsRepository: mongoose.mongo.Collection<IDBMessageStats>;

  private readonly moduleChannelStatsRepository: ModuleChannelsCollection;

  private readonly botDB: DBClient;

  constructor(botDB: DBClient) {
    this.botDB = botDB;

    this.discordStatsRepository = new DiscordStatsCollection(this.botDB).getCollection();
    this.discordGuildsRepository = new DiscordGuildsCollection(this.botDB).getCollection();
    this.discordMessageStatsRepository = new MessageStatsCollection(this.botDB).getCollection();
    this.moduleChannelStatsRepository = new ModuleChannelsCollection(this.botDB);
  }

  public async getStatsQuantity(): Promise<number> {
    try {
      const [statsCount, messageStatCount] = await Promise.all([
        this.discordStatsRepository.countDocuments(),
        this.getTotalMessageStatsCount(),
      ]);

      return statsCount + messageStatCount || 0;
    } catch (error) {
      Logger.error('Error while getting stats count', error);
      return 0;
    }
  }

  public async getFirstStatDocument(): Promise<IDiscordStats | null> {
    try {
      const firstStat = await this.discordStatsRepository.findOne({}, { sort: { createdAt: 1 } });
      return firstStat;
    } catch (error) {
      Logger.error('Error while getting first stat document', error);
      return null;
    }
  }

  public async getLastStatDocument(): Promise<IDiscordStats | null> {
    try {
      const lastStat = await this.discordStatsRepository.findOne({}, { sort: { createdAt: -1 } });
      return lastStat;
    } catch (error) {
      Logger.error('Error while getting last stat document', error);
      return null;
    }
  }

  public async getGuildsQuantity(): Promise<number> {
    try {
      const guildsCount = await this.discordGuildsRepository.countDocuments();
      return guildsCount || 0;
    } catch (error) {
      Logger.error('Error while getting guilds count', error);
      return 0;
    }
  }

  public async getPotentialMembersCount(): Promise<number> {
    try {
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
        return 0;
      }

      return potentialMembersCount[0].total;
    } catch (error) {
      Logger.error('Error while getting potential members count', error);
      return 0;
    }
  }

  private static getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getUTCDay();
    const diff = date.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), diff));
    monday.setUTCHours(0, 0, 0, 0);
    return monday;
  }

  private static getEndOfWeek(date: Date): Date {
    const sunday = new Date(date);
    sunday.setUTCDate(sunday.getUTCDate() + (7 - date.getUTCDay()));
    sunday.setUTCHours(23, 59, 59, 999);
    return sunday;
  }

  private static getWeekNumber(date: Date): string {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (Number(date) - Number(firstDayOfYear)) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    return `${date.getFullYear()}-${weekNumber}`;
  }

  public async getInteractionsStatsByWeekOnLastFiveWeeks(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[]> {
    try {
      const today = new Date();

      const promises = [];

      for (let i = 0; i < 5; i += 1) {
        const startOfWeek = MongoDBDiscordRepository.getStartOfWeek(new Date(today.getTime() - (i * 7 * 24 * 60 * 60 * 1000)));
        const endOfWeek = MongoDBDiscordRepository.getEndOfWeek(startOfWeek);

        const weekData = {
          startOfWeek: startOfWeek.toISOString().split('T')[0],
          endOfWeek: endOfWeek.toISOString().split('T')[0],
        };

        const promise = this.discordStatsRepository.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfWeek,
                $lte: endOfWeek,
              },
            },
          }, {
            $count: 'count',
          },
        ]).toArray().then((stat) => ({
          count: stat[0]?.count || 0,
          startOfWeek: weekData.startOfWeek,
          endOfWeek: weekData.endOfWeek,
          weekNumber: MongoDBDiscordRepository.getWeekNumber(startOfWeek),
        }));

        promises.push(promise);
      }

      const stats = await Promise.all(promises);

      if (!stats) {
        return [];
      }

      return stats.reverse();
    } catch (error) {
      Logger.error('Error while getting interactions stats by week on last five weeks', error);
      return [];
    }
  }

  public async getMessagesStatsByWeekOnLastFiveWeeks(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[]> {
    try {
      const today = new Date();
      const promises = [];

      for (let i = 0; i < 5; i += 1) {
        const startOfWeek = MongoDBDiscordRepository.getStartOfWeek(new Date(today.getTime() - (i * 7 * 24 * 60 * 60 * 1000)));
        const endOfWeek = MongoDBDiscordRepository.getEndOfWeek(startOfWeek);

        const weekData = {
          startOfWeek: startOfWeek.toISOString().split('T')[0],
          endOfWeek: endOfWeek.toISOString().split('T')[0],
        };

        const promise = this.discordMessageStatsRepository.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfWeek,
                $lte: endOfWeek,
              },
            },
          },
          {
            $group: {
              _id: null,
              totalSum: { $sum: '$successCount' },
            },
          },
        ]).toArray().then((stat) => ({
          count: stat[0]?.totalSum || 0,
          startOfWeek: weekData.startOfWeek,
          endOfWeek: weekData.endOfWeek,
          weekNumber: MongoDBDiscordRepository.getWeekNumber(startOfWeek),
        }));

        promises.push(promise);
      }

      const stats = await Promise.all(promises);

      if (!stats) {
        return [];
      }

      return stats.reverse();
    } catch (error) {
      Logger.error('Error while getting interactions stats by week on last five weeks', error);
      return [];
    }
  }

  public async getTotalAlmanaxServersCount(): Promise<number> {
    try {
      const totalAlmanaxServersCount = (await this.moduleChannelStatsRepository.getAllByModule(ModulesTypesEnum.Almanax)).reduce((acc: number, channel) => acc + (channel.modules.filter((module) => module.type === ModulesTypesEnum.Almanax).length), 0);
      return totalAlmanaxServersCount || 0;
    } catch (error) {
      Logger.error('Error while getting total almanax servers count', error);
      return 0;
    }
  }

  public async getTotalMessageStatsCount(): Promise<number> {
    try {
      const totalMessageCount = await this.discordMessageStatsRepository.aggregate([
        {
          $group: {
            _id: null,
            totalSum: { $sum: '$successCount' },
          },
        },
      ]).toArray();

      return totalMessageCount && totalMessageCount.length ? totalMessageCount[0].totalSum : 0;
    } catch (error) {
      Logger.error('Error while getting total message count', error);
      return 0;
    }
  }
}
