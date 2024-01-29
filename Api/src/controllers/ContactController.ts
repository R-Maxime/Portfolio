import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatusCode';
import DiscordWebhookContact from '../business/Usecase/Contact/DiscordWebhookContact';

export default class ContactController {
  constructor(
    private readonly discordWebhookContact: DiscordWebhookContact,
  ) { }

  async sendContactMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { user, mail, message } = req.body;

      if (!user || !mail || !message) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Missing fields' });
      }

      await this.discordWebhookContact.sendContactMessage(user, mail, message);

      return res.status(HttpStatusCode.OK).json({ message: 'OK' });
    } catch (error) {
      console.error('Error while sending contact message: ', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Error while sending contact message' });
    }
  }
}
