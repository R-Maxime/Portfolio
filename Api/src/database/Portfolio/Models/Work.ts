import { Model, Schema } from 'mongoose';
import DBClient from '../../client';
import IWork from '../../../business/Models/Work';

export default class WorkModel {
  private readonly PortfolioDB: DBClient;

  private readonly WorkSchema: Schema<IWork>;

  constructor(PortfolioDB: DBClient) {
    this.PortfolioDB = PortfolioDB;

    this.WorkSchema = new PortfolioDB.client.Schema<IWork>({
      id: { type: String, required: true, unique: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      repoUrl: { type: String },
      webUrl: { type: String },
      images: { type: [String] },
    });
  }

  get model(): Model<IWork> {
    if (this.PortfolioDB.client.models.Work) {
      return this.PortfolioDB.client.models.Work as Model<IWork>;
    }

    return this.PortfolioDB.client.model<IWork>('Work', this.WorkSchema);
  }
}
