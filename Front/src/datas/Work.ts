import IWork, { IWorkAddInput } from './Models/Work';
import constant from '../../constant';
import Auth from './Auth';

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

  private static async getFormData(work: IWorkAddInput): Promise<FormData> {
    const formData = new FormData();
    formData.append('id', work.id);
    formData.append('title', work.title);
    formData.append('description', work.description);
    formData.append('repoUrl', work.repoUrl);
    formData.append('webUrl', work.webUrl);
    formData.append('color', work.color);
    formData.append('logo', work.logo, work.logo.name);

    work.images.forEach((image) => {
      formData.append('images', image, image.name);
    });

    return formData;
  }

  static async addWork(work: IWorkAddInput): Promise<IWork> {
    const formData = await this.getFormData(work);

    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.WORKS}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${Auth.getToken()}`
      },
      body: formData
    });
    const newWork = await response.json();
    return newWork;
  }
}

export default Work;
