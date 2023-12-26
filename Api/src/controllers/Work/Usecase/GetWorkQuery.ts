import createHttpError, { HttpError } from 'http-errors';
import IWorkRepository from '../../../database/Portfolio/repositories/Work/IWorkRepository';
import HttpStatusCode from '../../../enums/HttpStatusCode';
import { IWorkDocument } from '../../../database/Portfolio/Models/Work';

export default class GetWorkQuery {
  workRepository: IWorkRepository;

  constructor(workRepository: IWorkRepository) {
    this.workRepository = workRepository;
  }

  async getAllWorks(): Promise<IWorkDocument[] | HttpError> {
    const works = await this.workRepository.getAllWorks();

    if (!works) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while getting all works');
    }

    return Promise.resolve(works);
  }

  async getWork(id: string): Promise<IWorkDocument | HttpError> {
    const work = await this.workRepository.getWorkById(id);

    if (!work) {
      return createHttpError(HttpStatusCode.NOT_FOUND, 'Work not found');
    }

    return Promise.resolve(work);
  }
}
