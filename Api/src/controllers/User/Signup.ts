import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import SignupCommand from './usecase/SignupCommand';
import HttpStatusCode from '../../enums/HttpStatusCode';

export default class Signup {
  private readonly signupCommand: SignupCommand;

  constructor(signupCommand: SignupCommand) {
    this.signupCommand = signupCommand;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      const command = await this.signupCommand.signup(username, password);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.CREATED).json(command);
    } catch (error) {
      console.error('Error while signup', error);
      return res.status(500).json({ message: 'Error while signup', error });
    }
  }
}
