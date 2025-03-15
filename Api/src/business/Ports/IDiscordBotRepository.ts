import { IInteractionStatsByWeekOnLastFiveWeeks } from '../Models/Discord';
import IDiscordStats from '../Models/DiscordStats';

export default interface IDiscordBotRepository {
  getStatsQuantity(): Promise<number>;
  getFirstStatDocument(): Promise<IDiscordStats | null>;
  getLastStatDocument(): Promise<IDiscordStats | null>;
  getGuildsQuantity(): Promise<number>;
  getPotentialMembersCount(): Promise<number>;
  getInteractionsStatsByWeekOnLastFiveWeeks(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[]>;
  getMessagesStatsByWeekOnLastFiveWeeks(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[]>;
  getTotalAlmanaxServersCount(): Promise<number>;
  getTotalMessageStatsCount(): Promise<number>;
}
