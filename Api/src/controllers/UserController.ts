import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import LoginQuery from '../business/Usecase/User/LoginQuery';
import SignupCommand from '../business/Usecase/User/SignupCommand';
import HttpStatusCode from '../enums/HttpStatusCode';
import Logger from '../utils/Logger';

export default class UserController {
  private readonly loginQuery: LoginQuery;

  private readonly signupCommand: SignupCommand;

  constructor(loginQuery: LoginQuery, signupCommand: SignupCommand) {
    this.loginQuery = loginQuery;
    this.signupCommand = signupCommand;
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      const query = await this.loginQuery.login(username, password);

      if (query instanceof HttpError) {
        return res.status(query.statusCode).json({ error: query.message });
      }

      return res.status(HttpStatusCode.OK).json(query);
    } catch (error) {
      Logger.error('Error while logging in', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while logging in', error });
    }
  }

  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, secretToken } = req.body;

      if (!secretToken || secretToken !== process.env.SECRET_TOKEN) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
      }

      const command = await this.signupCommand.signup(username, password);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.CREATED).json(command);
    } catch (error) {
      Logger.error('Error while signup', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while signup', error });
    }
  }
}
