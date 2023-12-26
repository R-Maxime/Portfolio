import mongoose, { Model, Schema } from 'mongoose';
import IUser from '../Interfaces/Users';
import DBClient from '../../client';

export interface IUserDocument extends IUser, mongoose.Document { }

export default class UserModel {
  private readonly PortfolioDB: DBClient;

  private readonly UserSchema: Schema<IUser>;

  constructor(PortfolioDB: DBClient) {
    this.PortfolioDB = PortfolioDB;

    this.UserSchema = new PortfolioDB.client.Schema<IUser>({
      username: { type: String, required: true },
      password: { type: String, required: true },
      createdAt: { type: Date, required: true },
    });
  }

  get schema(): Model<IUser> {
    return this.PortfolioDB.client.model<IUser>('User', this.UserSchema);
  }
}
