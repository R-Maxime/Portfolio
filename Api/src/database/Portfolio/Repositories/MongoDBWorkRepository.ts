import { Model } from 'mongoose';
import DBClient from '../../client';
import WorkModel from '../Models/Work';
import IWork from '../../../business/Models/Work';
import IWorkRepository from '../../../business/Ports/IWorkRepository';
import Logger from '../../../utils/Logger';

export default class MongoDBWorkRepository implements IWorkRepository {
  readonly workRepository: Model<IWork>;

  readonly portfolioDB: DBClient;

  constructor(portfolioDB: DBClient) {
    this.portfolioDB = portfolioDB;

    this.workRepository = new WorkModel(this.portfolioDB).getModel();
  }

  async create(work: IWork): Promise<IWork | null> {
    try {
      const newWork = await this.workRepository.create(work);
      return newWork;
    } catch (error) {
      Logger.error('Error while creating work', error);
      return null;
    }
  }

  async getAllWorks(): Promise<IWork[]> {
    try {
      const works = await this.workRepository.find();
      return works;
    } catch (error) {
      Logger.error('Error while getting all works', error);
      return [];
    }
  }

  async getWorkByWorkId(id: string): Promise<IWork | null> {
    try {
      const work = await this.workRepository.findOne({ id });
      return work;
    } catch (error) {
      Logger.error('Error while getting work by id', error);
      return null;
    }
  }

  async updateWorkById(work: IWork): Promise<IWork | null> {
    try {
      const updatedWork = await this.workRepository.findOneAndUpdate({ id: work.id }, work, { new: true });
      return updatedWork;
    } catch (error) {
      Logger.error('Error while updating work', error);
      return null;
    }
  }

  async deleteWorkById(id: string): Promise<void> {
    try {
      await this.workRepository.findOneAndDelete({ id });
    } catch (error) {
      Logger.error('Error while deleting work', error);
    }
  }
}
