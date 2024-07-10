import createHttpError, { HttpError } from 'http-errors';
import IWork from '../../Models/Work';
import IWorkRepository from '../../Ports/IWorkRepository';
import HttpStatusCode from '../../../enums/HttpStatusCode';

export default class PutWorkCommand {
  workRepository: IWorkRepository;

  constructor(workRepository: IWorkRepository) {
    this.workRepository = workRepository;
  }

  public async execute(work: IWork): Promise<IWork | HttpError> {
    const updatedWork = await this.workRepository.updateWorkById(work);

    if (!updatedWork) {
      return createHttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error while updating work');
    }

    return Promise.resolve(updatedWork);
  }
}
