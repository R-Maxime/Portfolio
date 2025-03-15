import IGlobalStats, { IInteractionStatsByWeekOnLastFiveWeeks } from '../../Models/Discord';
import IDiscordBotRepository from '../../Ports/IDiscordBotRepository';

export default class DiscordStatsQuery {
  private readonly discordRepository: IDiscordBotRepository;

  constructor(discordRepository: IDiscordBotRepository) {
    this.discordRepository = discordRepository;
  }

  public async getGlobalStats(): Promise<IGlobalStats> {
    const [statsCount, guildsCount, potentialMembersCount, firstCreatedAtDoc, lastCreatedAtDoc] = await Promise.all([
      this.discordRepository.getStatsQuantity(),
      this.discordRepository.getGuildsQuantity(),
      this.discordRepository.getPotentialMembersCount(),
      this.discordRepository.getFirstStatDocument(),
      this.discordRepository.getLastStatDocument(),
    ]);

    const data: IGlobalStats = {
      statsCount,
      guildsCount,
      potentialMembersCount,
      firstCreatedAt: firstCreatedAtDoc?.createdAt || new Date(),
      lastCreatedAt: lastCreatedAtDoc?.createdAt || new Date(),
    };

    return data;
  }

  public async getLastFiveWeeksStats(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[]> {
    const promises = [
      this.discordRepository.getInteractionsStatsByWeekOnLastFiveWeeks(),
      this.discordRepository.getMessagesStatsByWeekOnLastFiveWeeks(),
    ];

    const [interactionsStats, messagesStats] = await Promise.all(promises);

    return interactionsStats.map((i) => {
      const currentMsg = messagesStats.find((m) => m.startOfWeek === i.startOfWeek);

      return {
        ...i,
        count: i.count + (currentMsg?.count || 0),
      };
    });
  }

  public async getTotalAlmanaxServersCount(): Promise<number> {
    return this.discordRepository.getTotalAlmanaxServersCount();
  }
}
