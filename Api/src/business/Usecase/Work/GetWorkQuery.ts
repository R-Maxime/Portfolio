import createHttpError, { HttpError } from 'http-errors';
import IWorkRepository from '../../Ports/IWorkRepository';
import IWork from '../../Models/Work';
import HttpStatusCode from '../../../enums/HttpStatusCode';

export default class GetWorkQuery {
  workRepository: IWorkRepository;

  constructor(workRepository: IWorkRepository) {
    this.workRepository = workRepository;
  }

  public async getAllWorks(): Promise<IWork[] | HttpError> {
    const works = await this.workRepository.getAllWorks();

    if (!works) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while getting all works');
    }

    return Promise.resolve(works);
  }

  public async getWork(id: string): Promise<IWork | HttpError> {
    const work = await this.workRepository.getWorkByWorkId(id);

    if (!work) {
      return createHttpError(HttpStatusCode.NOT_FOUND, 'Work not found');
    }

    return Promise.resolve(work);
  }
}
