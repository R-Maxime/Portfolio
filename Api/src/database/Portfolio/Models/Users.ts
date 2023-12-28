import { Model, Schema } from 'mongoose';
import DBClient from '../../client';
import IUser from '../../../business/Models/Users';

export default class UserModel {
  private readonly PortfolioDB: DBClient;

  private readonly UserSchema: Schema<IUser>;

  constructor(PortfolioDB: DBClient) {
    this.PortfolioDB = PortfolioDB;

    this.UserSchema = new PortfolioDB.client.Schema<IUser>({
      id: { type: String, required: true, unique: true },
      username: { type: String, required: true },
      password: { type: String, required: true },
    });
  }

  get model(): Model<IUser> {
    if (this.PortfolioDB.client.models.User) {
      return this.PortfolioDB.client.models.User as Model<IUser>;
    }

    return this.PortfolioDB.client.model<IUser>('User', this.UserSchema);
  }
}
