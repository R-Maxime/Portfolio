import fs from 'fs';
import path from 'path';

export default class Logger {
  private readonly logStream: fs.WriteStream;

  constructor() {
    const logsFolderPath = process.env.LOGS_PATH || path.join(__dirname, '..', '..', 'logs');
    if (!fs.existsSync(logsFolderPath)) {
      fs.mkdirSync(logsFolderPath);
    }
    const currentDate = new Date().toISOString().split('T')[0];
    const logFilePath = path.join(logsFolderPath, `${currentDate}.txt`);
    this.logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
  }

  log(source: string, message: string): void {
    const currentDate = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
    console.info(`[${source}]: ${currentDate} - ${message}`);
    this.logStream.write(`[${source}]: ${currentDate} - ${message}\n`);
  }
}
