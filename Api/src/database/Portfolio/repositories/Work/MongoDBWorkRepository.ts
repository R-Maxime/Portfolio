import { Model } from 'mongoose';
import IWork from '../../Interfaces/Work';
import IWorkRepository from './IWorkRepository';
import DBClient from '../../../client';
import WorkModel, { IWorkDocument } from '../../Models/Work';

export default class MongoDBWorkRepository implements IWorkRepository {
  readonly workRepository: Model<IWork>;

  readonly portfolioDB: DBClient;

  constructor(portfolioDB: DBClient) {
    this.portfolioDB = portfolioDB;

    this.workRepository = new WorkModel(this.portfolioDB).schema;
  }

  async create(work: IWork): Promise<IWorkDocument> {
    const newWork = await this.workRepository.create(work);
    return newWork;
  }

  async getAllWorks(): Promise<IWorkDocument[] | null> {
    const works = await this.workRepository.find();
    return works;
  }

  async getWorkById(id: string): Promise<IWorkDocument | null> {
    const work = await this.workRepository.findById(id);
    return work;
  }

  async updateWorkById(id: string, work: IWork): Promise<IWorkDocument | null> {
    const updatedWork = await this.workRepository.findByIdAndUpdate(id, work);
    return updatedWork;
  }

  async deleteWorkById(id: string): Promise<void> {
    await this.workRepository.findByIdAndDelete(id);
    return Promise.resolve();
  }
}
