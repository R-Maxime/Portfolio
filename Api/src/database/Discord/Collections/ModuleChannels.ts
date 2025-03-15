import mongoose from 'mongoose';
import DBClient from '../../client';
import IModuleChannel, { ModulesTypesEnum } from '../../../business/Models/ModuleChannel';

export default class ModuleChannelsCollection {
  private readonly DiscordDB: DBClient;

  private readonly collectionName: string = 'module-channels';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;
  }

  public getCollection(): mongoose.mongo.Collection<IModuleChannel> {
    return this.DiscordDB.getDatabase().collection<IModuleChannel>(this.collectionName);
  }

  public async getAllByModule(module: ModulesTypesEnum): Promise<IModuleChannel[]> {
    const collection = this.getCollection();
    const channels = await collection.find({ 'modules.type': module }).toArray();
    return channels;
  }
}
