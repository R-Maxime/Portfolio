import express from 'express';
import DBClient from '../database/client';
import MongoDBWorkRepository from '../database/Portfolio/repositories/Work/MongoDBWorkRepository';
import IWorkRepository from '../database/Portfolio/repositories/Work/IWorkRepository';
import WorkController from '../controllers/WorkController';
import GetWorkQuery from '../controllers/Work/Usecase/GetWorkQuery';

export default class WorksRoutes {
  private readonly router: express.Router;

  private readonly portfolioDB: DBClient;

  private readonly workRepository: IWorkRepository;

  constructor(portfolioDB: DBClient) {
    this.router = express.Router();
    this.portfolioDB = portfolioDB;
    this.workRepository = new MongoDBWorkRepository(this.portfolioDB);
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const controller = new WorkController(
      new GetWorkQuery(this.workRepository),
    );

    this.router.get('/', controller.getWorks.bind(controller));
    this.router.get('/:id', controller.getWork.bind(controller));
  }

  get Router(): express.Router {
    return this.router;
  }
}