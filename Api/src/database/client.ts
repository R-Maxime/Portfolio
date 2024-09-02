import mongoose from 'mongoose';
import Logger from '../utils/Logger';

export default class DBClient {
  private readonly MONGO_IP: string;

  private readonly dbname: string;

  public readonly client: mongoose.Mongoose;

  constructor(dbname: string) {
    this.MONGO_IP = process.env.MONGO_IP as string;
    this.dbname = dbname;
    this.client = new mongoose.Mongoose();
  }

  public async connect(): Promise<void> {
    await this.client.connect(this.MONGO_IP, { dbName: this.dbname });
    Logger.log(`Connecté à la base de données ${this.dbname}`);
  }

  public getDatabase(): mongoose.mongo.Db {
    const { db } = this.client.connection;

    if (!db) {
      throw new Error('Database not connected');
    }

    return db;
  }
}
