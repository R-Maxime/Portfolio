import mongoose from 'mongoose';
import { IDiscordStats } from '../../../business/Models/DiscordStats';
import DBClient from '../../client';

export default class DiscordStatsCollection {
  private readonly DiscordDB: DBClient;

  private readonly collectionName: string = 'stats';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;
  }

  public getCollection(): mongoose.mongo.Collection<IDiscordStats> {
    return this.DiscordDB.client.connection.db.collection<IDiscordStats>(this.collectionName);
  }
}
