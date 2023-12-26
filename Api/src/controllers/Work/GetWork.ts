import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import HttpStatusCode from '../../enums/HttpStatusCode';
import GetWorkQuery from './Usecase/GetWorkQuery';

export default class GetWork {
  workQuery: GetWorkQuery;

  constructor(workQuery: GetWorkQuery) {
    this.workQuery = workQuery;
  }

  async getWorks(req: Request, res: Response): Promise<Response> {
    try {
      const query = await this.workQuery.getAllWorks();

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

      const query = await this.workQuery.getWork(id);

      if (query instanceof HttpError) {
        return res.status(query.statusCode).json({ error: query.message });
      }

      return res.status(HttpStatusCode.OK).json(query);
    } catch (error) {
      console.error('Error while getting work: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting work', error });
    }
  }
}
