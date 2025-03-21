import bcrypt from 'bcrypt';
import createHttpError, { HttpError } from 'http-errors';
import HttpStatusCode from '../../../enums/HttpStatusCode';
import IUserRepository from '../../Ports/IUserRepository';
import { generateToken } from '../../../middlewares/AuthMiddleware';

interface ILoginResponse {
  token: string,
  userId: string,
}

export default class LoginQuery {
  private readonly userRepository: IUserRepository;

  private readonly bcrypt: typeof bcrypt;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
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

    const token = generateToken(user.id);

    if (!token) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while generating token');
    }

    return {
      token,
      userId: user.id,
    };
  }

  private comparePassword(password: string, hash: string): Promise<boolean> {
    return this.bcrypt.compare(password, hash);
  }
}
