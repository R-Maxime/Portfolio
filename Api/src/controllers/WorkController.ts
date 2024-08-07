import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import GetWorkQuery from '../business/Usecase/Work/GetWorkQuery';
import PostWorkCommand from '../business/Usecase/Work/PostWorkCommand';
import HttpStatusCode from '../enums/HttpStatusCode';
import IWork from '../business/Models/Work';
import Utils from '../utils/Utils';
import PutWorkCommand from '../business/Usecase/Work/PutWorkCommand';
import DeleteWorkCommand from '../business/Usecase/Work/DeleteWorkCommand';
import Logger from '../utils/Logger';

export default class WorkController {
  private readonly getWorkQuery: GetWorkQuery;

  private readonly postWorkCommand: PostWorkCommand;

  private readonly putWorkCommand: PutWorkCommand;

  private readonly deleteWorkCommand: DeleteWorkCommand;

  constructor(getWorkQuery: GetWorkQuery, postWorkCommand: PostWorkCommand, putWorkCommand: PutWorkCommand, deleteWorkCommand: DeleteWorkCommand) {
    this.getWorkQuery = getWorkQuery;
    this.postWorkCommand = postWorkCommand;
    this.putWorkCommand = putWorkCommand;
    this.deleteWorkCommand = deleteWorkCommand;
  }

  async getWorks(req: Request, res: Response): Promise<Response> {
    try {
      const query = await this.getWorkQuery.getAllWorks();

      if (query instanceof HttpError) {
        return res.status(query.statusCode).json({ error: query.message });
      }

      return res.status(HttpStatusCode.OK).json(query);
    } catch (error) {
      Logger.error('Error while getting all works', error);
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
      Logger.error('Error while getting work', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting work', error });
    }
  }

  async createWork(req: Request, res: Response): Promise<Response> {
    try {
      const work = {
        ...req.body,
        images: Utils.getImagesFiles(req.files as Express.Multer.File[]),
        logo: Utils.getLogoFile(req.files as Express.Multer.File[]),
        technologies: Utils.getTechnologies(req.body.technologies),
        personal: req?.body?.personal === 'true',
      } as IWork;

      const command = await this.postWorkCommand.createWork(work);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.CREATED).json(command);
    } catch (error) {
      Logger.error('Error while creating work', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while creating work', error });
    }
  }

  async updateWork(req: Request, res: Response): Promise<Response> {
    try {
      const work = {
        ...req.body,
        images: Utils.getImagesFiles(req.files as Express.Multer.File[]),
        logo: Utils.getLogoFile(req.files as Express.Multer.File[]),
        technologies: req.body.technologies ? JSON.parse(req.body.technologies) : [],
        personal: req?.body?.personal === 'true',
      } as IWork;

      const command = await this.putWorkCommand.execute(work);

      if (command instanceof HttpError) {
        return res.status(command.statusCode).json({ error: command.message });
      }

      return res.status(HttpStatusCode.OK).json(command);
    } catch (error) {
      Logger.error('Error while updating work', error);
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
      Logger.error('Error while deleting work', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while deleting work', error });
    }
  }
}
