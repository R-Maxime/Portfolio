import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import LoginQuery from './usecase/LoginQuery';
import HttpStatusCode from '../../enums/HttpStatusCode';

export default class Login {
  private readonly loginQuery: LoginQuery;

  constructor(loginQuery: LoginQuery) {
    this.loginQuery = loginQuery;
  }

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      const query = await this.loginQuery.login(username, password);

      if (query instanceof HttpError) {
        return res.status(query.statusCode).json({ error: query.message });
      }

      return res.status(HttpStatusCode.OK).json(query);
    } catch (error) {
      console.error('Error while logging in', error);
      return res.status(500).json({ message: 'Error while logging in', error });
    }
  }
}
