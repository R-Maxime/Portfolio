import mongoose from 'mongoose';

export default class DBClient {
  private readonly MONGO_IP: string;

  private readonly dbname: string;

  client: mongoose.Mongoose;

  constructor(dbname: string) {
    this.MONGO_IP = process.env.MONGO_IP as string;
    this.dbname = dbname;
    this.client = new mongoose.Mongoose();
  }

  async connect(): Promise<void> {
    await this.client.connect(this.MONGO_IP, { dbName: this.dbname });
    console.info(`[MongoDB]: Connecté à la base de données ${this.dbname}`);
  }
}
