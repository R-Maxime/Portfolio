import { Model, Schema } from 'mongoose';
import { IDiscordStats } from '../../../business/Models/DiscordStats';
import DBClient from '../../client';

export default class DiscordStatsModel {
  private readonly DiscordDB: DBClient;

  private readonly DiscordStatsSchema: Schema<IDiscordStats>;

  private readonly collectionName: string = 'stats';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;

    this.DiscordStatsSchema = new DiscordDB.client.Schema({}, { collection: this.collectionName });
    /*
    Aucune propriété dans le model n'est définie car ce sont des données qui se veulent être privées et utilisés par le propriétaire du bot
    uniquement à des fins de statistiques.
    Je ne souhaite pas que le format complet des données soit rendu public.
    De ce fait, le fichier DiscordStats.ts contenant l'interface IDiscordStats n'est pas présent dans le repository.
    Il n'est pas non plus nécessaire de définir des propriétés dans le model car aucune données ne sera envoyé dans la base de données depuis l'API, seulement récupérée.
    */
  }

  get model(): Model<IDiscordStats> {
    if (this.DiscordDB.client.models.DiscordStats) {
      return this.DiscordDB.client.models.DiscordStats as Model<IDiscordStats>;
    }

    return this.DiscordDB.client.model<IDiscordStats>(this.collectionName, this.DiscordStatsSchema);
  }
}
