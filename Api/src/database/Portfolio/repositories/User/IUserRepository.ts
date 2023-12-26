import { Model } from 'mongoose';
import IUser from '../../Interfaces/Users';
import DBClient from '../../../client';
import { IUserDocument } from '../../Models/Users';

/**
 * Represents a user repository.
 */
export default interface IUserRepository {
  readonly userRepository: Model<IUser>;

  readonly portfolioDB: DBClient;

  /**
   * Creates a new user.
   * @param user - The user object to create.
   * @returns A promise that resolves to the created user.
   */
  create(user: IUser): Promise<IUserDocument>;

  /**
   * Finds a user by their username.
   * @param username - The username to search for.
   * @returns A promise that resolves to the found user, or null if not found.
   */
  findUserByUsername(username: string): Promise<IUserDocument | null>;
}
