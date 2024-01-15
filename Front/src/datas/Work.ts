import IWork from './Models/Work';
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

  private static async getFormData(work: IWork): Promise<FormData> {
    const formData = new FormData();
    formData.append('id', work.id);
    formData.append('title', work.title);
    formData.append('description', work.description);
    formData.append('repoUrl', work.repoUrl);
    formData.append('webUrl', work.webUrl);
    formData.append('color', work.color);
    formData.append('logo', work.logo);

    work.technologies.forEach((technology) => {
      formData.append('technologies', technology);
    });

    work.images.forEach((image) => {
      formData.append('images', image);
    });

    return formData;
  }

  static async addWork(work: IWork): Promise<IWork> {
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

  static async updateWork(work: IWork): Promise<IWork> {
    const formData = await this.getFormData(work);
    const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.WORKS}/${work.id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${Auth.getToken()}`
      },
      body: formData
    });
    const updatedWork = await response.json();
    return updatedWork;
  }

  static async deleteWork(id: number): Promise<void> {
    await fetch(`${constant.API_URL}/${constant.API_ROUTES.WORKS}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${Auth.getToken()}`
      }
    });
  }
}

export default Work;
