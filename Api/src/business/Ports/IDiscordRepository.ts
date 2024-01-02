import { IDiscordStats } from '../Models/DiscordStats';

/**
 * Represents a repository for accessing Discord statistics.
 */
export default interface IDiscordRepository {

  /**
   * Retrieves the total quantity of Discord statistics.
   * @returns A promise that resolves to the total quantity of Discord statistics, or null if no statistics are available.
   */
  getStatsQuantity(): Promise<number | null>;

  /**
   * Retrieves the first Discord statistics document.
   * @returns A promise that resolves to the first Discord statistics document, or null if no statistics are available.
   */
  getFirstStatDocument(): Promise<IDiscordStats | null>;

  /**
   * Retrieves the last Discord statistics document.
   * @returns A promise that resolves to the last Discord statistics document, or null if no statistics are available.
   */
  getLastStatDocument(): Promise<IDiscordStats | null>;

  /**
   * Retrieves the total quantity of guilds.
   * @returns A promise that resolves to the total quantity of guilds, or null if no guilds are available.
   */
  getGuildsQuantity(): Promise<number | null>;
  /**
   * Retrieves the total quantity of potential members.
   * @returns A promise that resolves to the total quantity of potential members, or null if no potential members are available.
   */
  getPotentialMembersCount(): Promise<number | null>;
}
