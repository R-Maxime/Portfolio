import express from 'express';
import DBClient from '../database/client';
import MongoDBWorkRepository from '../database/Portfolio/Repositories/MongoDBWorkRepository';
import IWorkRepository from '../business/Ports/IWorkRepository';
import WorkController from '../controllers/WorkController';
import GetWorkQuery from '../business/Usecase/Work/GetWorkQuery';
import PostWorkCommand from '../business/Usecase/Work/PostWorkCommand';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import Multer from '../middlewares/Multer';
import PutWorkCommand from '../business/Usecase/Work/PutWorkCommand';
import DeleteWorkCommand from '../business/Usecase/Work/DeleteWorkCommand';

const multerOptions = [
  { name: 'logo', maxCount: 1 },
  { name: 'images', maxCount: 10 },
];

export default class WorksRoutes {
  public readonly router: express.Router;

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
      new PostWorkCommand(this.workRepository),
      new PutWorkCommand(this.workRepository),
      new DeleteWorkCommand(this.workRepository),
    );

    this.router.get('/', controller.getWorks.bind(controller));
    this.router.get('/:id', controller.getWork.bind(controller));
    this.router.post('/', AuthMiddleware, Multer.fields(multerOptions), controller.createWork.bind(controller));
    this.router.put('/:id', AuthMiddleware, Multer.fields(multerOptions), controller.updateWork.bind(controller));
    this.router.delete('/:id', AuthMiddleware, controller.deleteWork.bind(controller));
  }
}
