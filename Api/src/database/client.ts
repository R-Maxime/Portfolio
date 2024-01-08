import mongoose from 'mongoose';
import Logger from '../utils/Logger';

export default class DBClient {
  private readonly MONGO_IP: string;

  private readonly dbname: string;

  private logger = new Logger();

  client: mongoose.Mongoose;

  constructor(dbname: string) {
    this.MONGO_IP = process.env.MONGO_IP as string;
    this.dbname = dbname;
    this.client = new mongoose.Mongoose();
  }

  async connect(): Promise<void> {
    await this.client.connect(this.MONGO_IP, { dbName: this.dbname });
    this.logger.log('MongoDB', `Connecté à la base de données ${this.dbname}`);
  }
}
