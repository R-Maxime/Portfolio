import { IDiscordStats } from '../Models/DiscordStats';

/**
 * Represents a repository for interacting with Discord data.
 */
export default interface IDiscordRepository {
  /**
   * Retrieves all Discord statistics.
   * @returns A promise that resolves to an array of Discord statistics or null if no statistics are available.
   */
  getAllStats(): Promise<IDiscordStats[] | null>;
}
