import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import GetWorkQuery from '../business/Usecase/Work/GetWorkQuery';
import PostWorkCommand from '../business/Usecase/Work/PostWorkCommand';
import HttpStatusCode from '../enums/HttpStatusCode';
import IWork from '../business/Models/Work';
import { getFilesUrl } from '../utils/Utils';
import PutWorkCommand from '../business/Usecase/Work/PutWorkCommand';
import DeleteWorkCommand from '../business/Usecase/Work/DeleteWorkCommand';

export default class WorkController {
  constructor(
    private readonly getWorkQuery: GetWorkQuery,
    private readonly postWorkCommand: PostWorkCommand,
    private readonly putWorkCommand: PutWorkCommand,
    private readonly deleteWorkCommand: DeleteWorkCommand,
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
      const work = {
        ...JSON.parse(req.body.work),
        images: req.files?.length ? getFilesUrl(req.files as Express.Multer.File[]) : [],
      } as IWork;

      const command = await this.postWorkCommand.createWork(work);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.CREATED).json(command);
    } catch (error) {
      console.error('Error while creating work: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while creating work', error });
    }
  }

  async updateWork(req: Request, res: Response): Promise<Response> {
    try {
      const work = {
        ...JSON.parse(req.body.work),
        images: req.files?.length ? getFilesUrl(req.files as Express.Multer.File[]) : [],
      } as IWork;

      const command = await this.putWorkCommand.execute(work);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.OK).json(command);
    } catch (error) {
      console.error('Error while updating work: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while updating work', error });
    }
  }

  async deleteWork(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const workExist = await this.getWorkQuery.getWork(id);

      if (workExist instanceof HttpError) {
        return res.status(workExist.statusCode).json({ error: workExist.message });
      }

      const command = await this.deleteWorkCommand.execute(id);

      return res.status(HttpStatusCode.OK).json(command);
    } catch (error) {
      console.error('Error while deleting work: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while deleting work', error });
    }
  }
}
