import mongoose from 'mongoose';
import { IDiscordStats } from '../../../business/Models/DiscordStats';
import DBClient from '../../client';

export default class DiscordStatsCollection {
  private readonly DiscordDB: DBClient;

  private readonly collectionName: string = 'stats';

  constructor(DiscordDB: DBClient) {
    this.DiscordDB = DiscordDB;

    /*
    Aucun model n'est défini car ce sont des données qui se veulent être privées et utilisés par le propriétaire du bot uniquement à des fins de statistiques.
    C'est pour cela que j'utilise directement la collection de la base de données sans passer par un model pour récupérer les données.
    Je ne souhaite pas que le format complet des données soit rendu public.
    De ce fait, les fichier Discord*.ts contenant les interfaces liées à Discord ne sont pas présentes dans le repository..
    */
  }

  get collection(): mongoose.Collection<IDiscordStats> {
    return this.DiscordDB.client.connection.db.collection<IDiscordStats>(this.collectionName) as mongoose.Collection<IDiscordStats>;
  }
}
