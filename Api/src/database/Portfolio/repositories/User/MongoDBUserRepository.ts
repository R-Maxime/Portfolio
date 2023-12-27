import { Model } from 'mongoose';
import DBClient from '../../../client';
import IUser from '../../Interfaces/Users';
import UserModel, { IUserDocument } from '../../Models/Users';
import IUserRepository from './IUserRepository';

export default class MongoDBUserRepository implements IUserRepository {
  readonly userRepository: Model<IUser>;

  readonly portfolioDB: DBClient;

  constructor(portfolioDB: DBClient) {
    this.portfolioDB = portfolioDB;

    this.userRepository = new UserModel(this.portfolioDB).model;
  }

  async create(user: IUser): Promise<IUserDocument> {
    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async findUserByUsername(username: string): Promise<IUserDocument | null> {
    const user = await this.userRepository.findOne({ username });
    return user;
  }
}
