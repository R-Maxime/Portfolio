import { Model } from 'mongoose';
import DBClient from '../../../client';
import IWork from '../../Interfaces/Work';
import { IWorkDocument } from '../../Models/Work';

/**
 * Represents the interface for a work repository.
 */
export default interface IWorkRepository {
  readonly workRepository: Model<IWork>;

  readonly portfolioDB: DBClient;

  /**
   * Creates a new work.
   * @param work The work to create.
   * @returns A promise that resolves to the created work document.
   */
  create(work: IWork): Promise<IWorkDocument>;

  /**
   * Retrieves all works.
   * @returns A promise that resolves to an array of work documents, or null if no works are found.
   */
  getAllWorks(): Promise<IWorkDocument[] | null>;

  /**
   * Retrieves a work by its ID.
   * @param id The ID of the work to retrieve.
   * @returns A promise that resolves to the retrieved work document, or null if no work is found.
   */
  getWorkById(id: string): Promise<IWorkDocument | null>;

  /**
   * Updates a work by its ID.
   * @param id The ID of the work to update.
   * @param work The updated work data.
   * @returns A promise that resolves to the updated work document, or null if no work is found.
   */
  updateWorkById(id: string, work: IWork): Promise<IWorkDocument | null>;

  /**
   * Deletes a work by its ID.
   * @param id The ID of the work to delete.
   * @returns A promise that resolves to the deleted work document, or null if no work is found.
   */
  deleteWorkById(id: string): Promise<void>;
}
