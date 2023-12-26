import { Request, Response } from 'express';
import GetWork from './Work/GetWork';
import GetWorkQuery from './Work/Usecase/GetWorkQuery';

export default class WorkController {
  constructor(
    private readonly getWorkQuery: GetWorkQuery,
  ) { }

  async getWorks(req: Request, res: Response): Promise<Response> {
    const getWorks = await new GetWork(this.getWorkQuery).getWorks(req, res);
    return getWorks;
  }

  async getWork(req: Request, res: Response): Promise<Response> {
    const getWork = await new GetWork(this.getWorkQuery).getWork(req, res);
    return getWork;
  }
}
