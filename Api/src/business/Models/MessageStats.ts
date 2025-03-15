export default interface IMessageStats {
  error: IMessageStatError[],
  success: IMessageStatSuccess[],
  total: number,
  errorCount: number,
  successCount: number,
  type: MessageStatsTypes;
}

export interface IGuildStat {
  name: string,
  id: string,
  channelId: string,
  stringData?: string,
}

export interface IMessageStatError extends IGuildStat {
  error: IMessageStatErrorTypes,
}

export interface IMessageStatSuccess extends IGuildStat {
  time: number,
  discordMessageId: string,
}

export enum IMessageStatErrorTypes {
  UnknownChannel = 'Unknown Channel',
  GuildNotFound = 'Guild not found',
  ChannelNotFound = 'Channel not found',
  ChannelNotTextBased = 'Channel not text based',
  UnknownError = 'Unknown error',
  LangNotFound = 'Lang not found',
}

export enum MessageStatsTypes {
  Tweet = 'Tweet',
  Almanax = 'Almanax',
  HaapiNews = 'HaapiNews',
  AnkamaShop = 'AnkamaShop',
}

export interface IDBMessageStats extends IMessageStats {
  createdAt: Date;
}
