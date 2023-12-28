import bcrypt from 'bcrypt';
import createHttpError, { HttpError } from 'http-errors';
import { randomUUID } from 'crypto';
import HttpStatusCode from '../../../enums/HttpStatusCode';
import IUserRepository from '../../Ports/IUserRepository';
import IUser from '../../Models/Users';

export default class SignupCommand {
  private readonly userRepository: IUserRepository;

  private readonly bcrypt: typeof bcrypt;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
  }

  public async signup(username: string, password: string): Promise<HttpError | IUser> {
    if (!username || !password) {
      return createHttpError(HttpStatusCode.BAD_REQUEST, 'Username or password is missing');
    }

    const userExists = await this.userRepository.findUserByUsername(username);

    if (userExists) {
      return createHttpError(HttpStatusCode.CONFLICT, 'Username already exists');
    }

    const hash = await this.hashPassword(password);
    if (!hash) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while hashing password');
    }

    const user = await this.userRepository.create({
      id: randomUUID().toString(),
      username,
      password: hash,
    });

    if (!user) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while creating user');
    }

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return this.bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
  }
}
