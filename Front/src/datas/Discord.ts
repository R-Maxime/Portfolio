import { IGlobalStats, IInteractionStatsByWeekOnLastFiveWeeks } from './Models/Discord';
import constant from '../../constant';

class Discord {
  static async getGlobalStats(): Promise<IGlobalStats> {
    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.DISCORD_GLOBAL}`);
    const globalStats = await response.json();
    return globalStats;
  }

  static async getLastFiveWeeksStats(): Promise<IInteractionStatsByWeekOnLastFiveWeeks[]> {
    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.DISCORD_LAST_FIVE_WEEKS}`);
    const interactionStatsByWeekOnLastMonth = await response.json();
    return interactionStatsByWeekOnLastMonth;
  }

  static async getAlmanaxQuantity(): Promise<number> {
    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.DISCORD_ALMANAX_QUANTITY}`);
    const almanaxQuantity = await response.json().then((data: { count: number }) => data.count);
    return almanaxQuantity;
  }
}

export default Discord;
