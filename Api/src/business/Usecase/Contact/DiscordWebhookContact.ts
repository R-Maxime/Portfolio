import { EmbedBuilder, WebhookClient, userMention } from 'discord.js';

export default class DiscordWebhookContact {
  private readonly webhook: WebhookClient;

  constructor() {
    this.webhook = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL as string });
  }

  async sendContactMessage(name: string, mail: string, message: string): Promise<void> {
    const embed = new EmbedBuilder()
      .setTitle(`Message de: ${name} - ${mail}`)
      .setDescription(message)
      .setColor('DarkBlue')
      .setFooter({ text: 'Portfolio - Contact' })
      .setTimestamp(new Date());

    await this.webhook.send({
      content: userMention(process.env.DISCORD_OWNER_ID as string),
      embeds: [embed],
      username: 'Portfolio - Contact',
    });
  }
}
