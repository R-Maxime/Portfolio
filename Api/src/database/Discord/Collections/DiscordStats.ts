import mongoose from 'mongoose';
import DBClient from '../../client';
import { IDiscordStats } from '../../../business/Models/DiscordStats';

export default class DiscordStatsCollection {
  private readonly DiscordDB: DBClient;

  private readonly collectionName: string = 'discord-stats';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;
  }

  public getCollection(): mongoose.mongo.Collection<IDiscordStats> {
    return this.DiscordDB.getDatabase().collection<IDiscordStats>(this.collectionName);
  }
}
