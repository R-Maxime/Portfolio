import mongoose from 'mongoose';
import { IDiscordGuilds } from '../../../business/Models/DiscordGuilds';
import DBClient from '../../client';

export default class DiscordGuildsCollection {
  private readonly DiscordDB: DBClient;

  private readonly collectionName: string = 'guilds';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;
  }

  public getCollection(): mongoose.mongo.Collection<IDiscordGuilds> {
    return this.DiscordDB.client.connection.db.collection<IDiscordGuilds>(this.collectionName);
  }
}
