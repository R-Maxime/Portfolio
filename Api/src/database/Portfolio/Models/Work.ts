import { Model, Schema } from 'mongoose';
import DBClient from '../../client';
import IWork from '../../../business/Models/Work';

export default class WorkModel {
  private readonly PortfolioDB: DBClient;

  private readonly WorkSchema: Schema<IWork>;

  constructor(PortfolioDB: DBClient) {
    this.PortfolioDB = PortfolioDB;

    this.WorkSchema = new PortfolioDB.client.Schema<IWork>({
      id: {
        type: String, required: true, unique: true, lowercase: true, trim: true,
      },
      title: { type: String, required: true },
      description: { type: String, required: true },
      longDescription: { type: String },
      repoUrl: { type: String },
      webUrl: { type: String },
      images: { type: [String] },
      color: { type: String },
      logo: { type: String },
      technologies: {
        type: [{
          name: { type: String },
          url: { type: String },
          icon: { type: String },
        }],
      },
      personal: { type: Boolean, default: false },
    });
  }

  public getModel(): Model<IWork> {
    return this.PortfolioDB.client.model<IWork>('Work', this.WorkSchema);
  }
}
