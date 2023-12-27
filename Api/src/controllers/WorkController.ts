import { Request, Response } from 'express';
import GetWork from './Work/GetWork';
import GetWorkQuery from './Work/Usecase/GetWorkQuery';
import PostWorkCommand from './Work/Usecase/PostWorkCommand';
import PostWork from './Work/PostWork';

export default class WorkController {
  constructor(
    private readonly getWorkQuery: GetWorkQuery,
    private readonly postWorkCommand: PostWorkCommand,
  ) { }

  async getWorks(req: Request, res: Response): Promise<Response> {
    const getWorks = await new GetWork(this.getWorkQuery).getWorks(req, res);
    return getWorks;
  }

  async getWork(req: Request, res: Response): Promise<Response> {
    const getWork = await new GetWork(this.getWorkQuery).getWork(req, res);
    return getWork;
  }

  async createWork(req: Request, res: Response): Promise<Response> {
    const createWork = await new PostWork(this.postWorkCommand).createWork(req, res);
    return createWork;
  }
}
