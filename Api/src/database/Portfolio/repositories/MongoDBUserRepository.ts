import { Model } from 'mongoose';
import DBClient from '../../client';
import IUser from '../Interfaces/Users';
import UserModel, { IUserDocument } from '../Models/Users';
import IUserRepository from './IUserRepository';

export default class MongoDBUserRepository implements IUserRepository {
  readonly userRepository: Model<IUser>;

  readonly portfolioDB: DBClient;

  constructor(portfolioDB: DBClient) {
    this.portfolioDB = portfolioDB;

    this.userRepository = new UserModel(this.portfolioDB).getSchema();
  }

  async create(user: IUser): Promise<IUserDocument> {
    return this.userRepository.create(user);
  }

  async findUserByUsername(username: string): Promise<IUserDocument | null> {
    return this.userRepository.findOne({ username });
  }
}
