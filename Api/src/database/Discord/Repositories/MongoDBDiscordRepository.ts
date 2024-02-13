/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import DBClient from '../../client';
import IDiscordBotRepository from '../../../business/Ports/IDiscordBotRepository';
import DiscordStatsCollection from '../Collections/DiscordStats';
import DiscordGuildsCollection from '../Collections/DiscordGuilds';
import { IDiscordStats } from '../../../business/Models/DiscordStats';
import { IDiscordGuilds } from '../../../business/Models/DiscordGuilds';
import { IInteractionStatsByWeekOnLastFiveWeeks } from '../../../business/Models/Discord';

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

  async getInteractionsStatsByWeekOnLastFiveWeeks(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[] | null> {
    const today = new Date();

    const stats: IInteractionStatsByWeekOnLastFiveWeeks[] = [];

    for (let i = 0; i < 5; i += 1) {
      const startOfWeek = MongoDBDiscordRepository.getStartOfWeek(new Date(today.getTime() - (i * 7 * 24 * 60 * 60 * 1000)));
      const endOfWeek = MongoDBDiscordRepository.getEndOfWeek(startOfWeek);

      const weekData = {
        startOfWeek: startOfWeek.toISOString().split('T')[0],
        endOfWeek: endOfWeek.toISOString().split('T')[0],
      };

      const stat = await this.discordStatsRepository.aggregate([
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
      ]).toArray();

      stats.push({
        count: stat[0].count,
        startOfWeek: weekData.startOfWeek,
        endOfWeek: weekData.endOfWeek,
        weekNumber: MongoDBDiscordRepository.getWeekNumber(startOfWeek),
      });
    }

    if (!stats || !stats.length) {
      return null;
    }

    return stats.reverse();
  }
}
