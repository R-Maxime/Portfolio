import express from 'express';
import ContactController from '../controllers/ContactController';
import DiscordWebhookContact from '../business/Usecase/Contact/DiscordWebhookContact';

export default class ContactRoute {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    const controller = new ContactController(new DiscordWebhookContact());

    this.router.post('/', controller.sendContactMessage.bind(controller));
  }

  get Router(): express.Router {
    return this.router;
  }
}
