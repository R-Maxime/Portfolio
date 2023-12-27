import createHttpError, { HttpError } from 'http-errors';
import IWorkRepository from '../../../database/Portfolio/repositories/Work/IWorkRepository';
import HttpStatusCode from '../../../enums/HttpStatusCode';
import { IWorkDocument } from '../../../database/Portfolio/Models/Work';
import IWork from '../../../database/Portfolio/Interfaces/Work';

export default class PostWorkCommand {
  workRepository: IWorkRepository;

  constructor(workRepository: IWorkRepository) {
    this.workRepository = workRepository;
  }

  async createWork(workBody: IWork): Promise<IWorkDocument | HttpError> {
    const work = {
      ...workBody,
      createdAt: new Date(),
    };

    console.log(work);

    const works = await this.workRepository.create(work);

    if (!works) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while creating work');
    }

    return Promise.resolve(works);
  }
}
