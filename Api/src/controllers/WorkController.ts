import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import GetWorkQuery from '../business/Usecase/Work/GetWorkQuery';
import PostWorkCommand from '../business/Usecase/Work/PostWorkCommand';
import HttpStatusCode from '../enums/HttpStatusCode';
import IWork from '../business/Models/Work';

export default class WorkController {
  constructor(
    private readonly getWorkQuery: GetWorkQuery,
    private readonly postWorkCommand: PostWorkCommand,
  ) { }

  async getWorks(req: Request, res: Response): Promise<Response> {
    try {
      const query = await this.getWorkQuery.getAllWorks();

      if (query instanceof HttpError) {
        return res.status(query.statusCode).json({ error: query.message });
      }

      return res.status(HttpStatusCode.OK).json(query);
    } catch (error) {
      console.error('Error while getting all works: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting all works', error });
    }
  }

  async getWork(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const query = await this.getWorkQuery.getWork(id);

      if (query instanceof HttpError) {
        return res.status(query.statusCode).json({ error: query.message });
      }

      return res.status(HttpStatusCode.OK).json(query);
    } catch (error) {
      console.error('Error while getting work: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting work', error });
    }
  }

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
