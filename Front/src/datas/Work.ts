import IWork from './Models/Work';
import constant from '../../constant';

class Work {
  static async getWorks(): Promise<IWork[]> {
    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.WORKS}`);
    const works = await response.json();
    return works;
  }

  static async getWork(id: number): Promise<IWork> {
    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.WORKS}/${id}`);
    const work = await response.json();
    return work;
  }
}

export default Work;
