import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import LoginQuery from '../business/Usecase/User/LoginQuery';
import SignupCommand from '../business/Usecase/User/SignupCommand';
import HttpStatusCode from '../enums/HttpStatusCode';

export default class UserController {
  constructor(
    private readonly loginQuery: LoginQuery,
    private readonly signupCommand: SignupCommand,
  ) { }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      const query = await this.loginQuery.login(username, password);

      if (query instanceof HttpError) {
        return res.status(query.statusCode).json({ error: query.message });
      }

      return res.status(HttpStatusCode.OK).json(query);
    } catch (error) {
      console.error('Error while logging in', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while logging in', error });
    }
  }

  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      const command = await this.signupCommand.signup(username, password);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.CREATED).json(command);
    } catch (error) {
      console.error('Error while signup', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while signup', error });
    }
  }
}
