import { Model } from 'mongoose';
import DBClient from '../../client';
import UserModel from '../Models/Users';
import IUser from '../../../business/Models/Users';
import IUserRepository from '../../../business/Ports/IUserRepository';

export default class MongoDBUserRepository implements IUserRepository {
  readonly userRepository: Model<IUser>;

  readonly portfolioDB: DBClient;

  constructor(portfolioDB: DBClient) {
    this.portfolioDB = portfolioDB;

    this.userRepository = new UserModel(this.portfolioDB).getModel();
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async findUserByUsername(username: string): Promise<IUser | null> {
    const user = await this.userRepository.findOne({ username });
    return user;
  }
}
