import { Model } from 'mongoose';
import DBClient from '../../client';
import WorkModel from '../Models/Work';
import IWork from '../../../business/Models/Work';
import IWorkRepository from '../../../business/Ports/IWorkRepository';

export default class MongoDBWorkRepository implements IWorkRepository {
  readonly workRepository: Model<IWork>;

  readonly portfolioDB: DBClient;

  constructor(portfolioDB: DBClient) {
    this.portfolioDB = portfolioDB;

    this.workRepository = new WorkModel(this.portfolioDB).model;
  }

  async create(work: IWork): Promise<IWork> {
    const newWork = await this.workRepository.create(work);
    return newWork;
  }

  async getAllWorks(): Promise<IWork[] | null> {
    const works = await this.workRepository.find();
    return works;
  }

  async getWorkByWorkId(id: string): Promise<IWork | null> {
    const work = await this.workRepository.findOne({ id });
    return work;
  }

  async updateWorkById(work: IWork): Promise<IWork | null> {
    const updatedWork = await this.workRepository.findOneAndUpdate({ id: work.id }, work, { new: true });
    return updatedWork;
  }

  async deleteWorkById(id: string): Promise<void> {
    await this.workRepository.findOneAndDelete({ id });
    return Promise.resolve();
  }
}
