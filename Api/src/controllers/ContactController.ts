import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatusCode';
import DiscordWebhookContact from '../business/Usecase/Contact/DiscordWebhookContact';
import Logger from '../utils/Logger';

export default class ContactController {
  constructor(
    private readonly discordWebhookContact: DiscordWebhookContact,
  ) { }

  async sendContactMessage(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name, mail, message, phone,
      } = req.body;

      if (phone) {
        Logger.warn('Phone number detected, aborting (probably a bot)');
        return res.status(HttpStatusCode.OK).json({ message: 'OK' });
      }

      if (!name || !mail || !message) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Missing fields' });
      }

      await this.discordWebhookContact.sendContactMessage(name, mail, message);

      return res.status(HttpStatusCode.OK).json({ message: 'OK' });
    } catch (error) {
      Logger.error('Error while sending contact message', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while sending contact message' });
    }
  }
}
