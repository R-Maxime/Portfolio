import express from 'express';
import DBClient from '../database/client';
import LoginQuery from '../controllers/User/usecase/LoginQuery';
import IUserRepository from '../database/Portfolio/repositories/IUserRepository';
import MongoDBUserRepository from '../database/Portfolio/repositories/MongoDBUserRepository';
import UserController from '../controllers/UserController';
import SignupCommand from '../controllers/User/usecase/SignupCommand';

export default class UserRoutes {
  private readonly router: express.Router;

  private readonly portfolioDB: DBClient;

  private readonly userRepository: IUserRepository;

  constructor(portfolioDB: DBClient) {
    this.router = express.Router();
    this.portfolioDB = portfolioDB;
    this.userRepository = new MongoDBUserRepository(this.portfolioDB);
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const controller = new UserController(
      new LoginQuery(this.userRepository),
      new SignupCommand(this.userRepository),
    );

    this.router.post('/login', controller.login.bind(controller));
    this.router.post('/signup', controller.signup.bind(controller));
  }

  getRouter(): express.Router {
    return this.router;
  }
}
