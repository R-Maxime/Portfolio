import mongoose from 'mongoose';
import DBClient from '../../client';
import { IDiscordGuilds } from '../../../business/Models/DiscordGuilds';

export default class DiscordGuildsCollection {
  private readonly DiscordDB: DBClient;

  private readonly collectionName: string = 'guilds';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;
  }

  public getCollection(): mongoose.mongo.Collection<IDiscordGuilds> {
    return this.DiscordDB.getDatabase().collection<IDiscordGuilds>(this.collectionName);
  }
}
