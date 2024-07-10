import createHttpError, { HttpError } from 'http-errors';
import IWorkRepository from '../../Ports/IWorkRepository';
import IWork from '../../Models/Work';
import HttpStatusCode from '../../../enums/HttpStatusCode';

export default class PostWorkCommand {
  workRepository: IWorkRepository;

  constructor(workRepository: IWorkRepository) {
    this.workRepository = workRepository;
  }

  public async createWork(workData: IWork): Promise<IWork | HttpError> {
    const work = await this.workRepository.create(workData);

    if (!work) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while creating work');
    }

    return Promise.resolve(work);
  }
}
