import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError, { HttpError } from 'http-errors';
import HttpStatusCode from '../../../enums/HttpStatusCode';
import IUserRepository from '../../Ports/IUserRepository';

interface ILoginResponse {
  token: string,
  userId: string,
}

export default class LoginQuery {
  private readonly userRepository: IUserRepository;

  private readonly jwt: typeof jwt;

  private readonly bcrypt: typeof bcrypt;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.jwt = jwt;
    this.bcrypt = bcrypt;
  }

  async login(username: string, password: string): Promise<HttpError | ILoginResponse> {
    if (!username || !password) {
      return createHttpError(HttpStatusCode.BAD_REQUEST, 'Login or password incorrect');
    }

    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      return createHttpError(HttpStatusCode.BAD_REQUEST, 'Login or password incorrect');
    }

    const passwordIsValid = await this.comparePassword(password, user.password);

    if (!passwordIsValid) {
      return createHttpError(HttpStatusCode.BAD_REQUEST, 'Login or password incorrect');
    }

    const token = this.generateToken(user.id);

    if (!token) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while generating token');
    }

    return Promise.resolve({
      token,
      userId: user.id,
    });
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return this.bcrypt.compare(password, hash);
  }

  generateToken(userId: string): string {
    return this.jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
    );
  }
}
