import mongoose from 'mongoose';
import DBClient from '../../client';
import { IDBMessageStats } from '../../../business/Models/MessageStats';

export default class MessageStatsCollection {
  private readonly DiscordDB: DBClient;

  private readonly collectionName: string = 'message-stats';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;
  }

  public getCollection(): mongoose.mongo.Collection<IDBMessageStats> {
    return this.DiscordDB.getDatabase().collection<IDBMessageStats>(this.collectionName);
  }
}
