import IWorkRepository from '../../Ports/IWorkRepository';

export default class DeleteWorkCommand {
  readonly workRepository: IWorkRepository;

  constructor(workRepository: IWorkRepository) {
    this.workRepository = workRepository;
  }

  public async execute(workId: string): Promise<void> {
    await this.workRepository.deleteWorkById(workId);
    return Promise.resolve();
  }
}
