export default interface IMessageStats {
  /**
   * All the guild who fail to send the message
   */
  error: IMessageStatError[],
  /**
   * All the guild who success to send the message
   */
  success: IMessageStatSuccess[],

  /**
   * The total number of guild
   */
  total: number,
  /**
   * The number of guild who fail to send the message
   */
  errorCount: number,
  /**
   * The number of guild who success to send the message
   */
  successCount: number,
  /**
   * The type of the message
   */
  type: MessageStatsTypes;
}

export interface IGuildStat {
  /**
   * The name of the guild
   */
  name: string,
  /**
   * The id of the guild
   */
  id: string,
  /**
   * The id of the channel
   */
  channelId: string,
  /**
   * Some data in a string
   * Used for storing the lang of the almanax
   */
  stringData?: string,
}

export interface IMessageStatError extends IGuildStat {
  /**
   * The error message
   */
  error: string,
}

export interface IMessageStatSuccess extends IGuildStat {
  /**
   * The time it took to send the message
   */
  time: number,
  /**
   * The id of the message
   */
  discordMessageId: string,
}

export enum IMessageStatErrorTypes {
  GUILD_NOT_FOUND = 'Guild not found',
  CHANNEL_NOT_FOUND = 'Channel not found',
  CHANNEL_NOT_TEXT_BASED = 'Channel not text based',
  UNKNOWN_ERROR = 'Unknown error',
}

export enum MessageStatsTypes {
  TWEET = 'Tweet',
  ALMANAX = 'Almanax',
  HAAPI_NEWS = 'HaapiNews',
  ANKAMA_SHOP = 'AnkamaShop',
}

export interface IDBMessageStats extends IMessageStats {
  createdAt: Date;
}
