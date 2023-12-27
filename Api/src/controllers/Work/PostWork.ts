import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import HttpStatusCode from '../../enums/HttpStatusCode';
import IWork from '../../database/Portfolio/Interfaces/Work';
import PostWorkCommand from './Usecase/PostWorkCommand';

export default class PostWork {
  constructor(
    private readonly postWorkCommand: PostWorkCommand,
  ) { }

  async createWork(req: Request, res: Response): Promise<Response> {
    try {
      console.log(JSON.stringify(req.body, null, 2));
      const command = await this.postWorkCommand.createWork(req.body.work as IWork);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.CREATED).json(command);
    } catch (error) {
      console.error('Error while creating work: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while creating work', error });
    }
  }
}
