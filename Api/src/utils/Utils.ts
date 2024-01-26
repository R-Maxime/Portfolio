import IWork from '../business/Models/Work';

export default class Utils {
  static getFileUrl(file: Express.Multer.File) {
    return `${process.env.API_URL}/public/${file.mimetype.split('/')[0]}/${file.filename}`;
  }

  static getFilesUrl(files: Express.Multer.File[]) {
    return files.map((image) => this.getFileUrl(image));
  }

  static getImagesFiles(files: Express.Multer.File[]) {
    if (files && 'images' in files && (files.images as Express.Multer.File[]).length) {
      return this.getFilesUrl(files.images as Express.Multer.File[]);
    }

    return [];
  }

  static getLogoFile(files: Express.Multer.File[]) {
    if (files && 'logo' in files && (files.logo as Express.Multer.File[]).length) {
      return this.getFilesUrl(files.logo as Express.Multer.File[])[0];
    }

    return '';
  }

  static getTechnologies(technologies: string[]): IWork['technologies'] {
    if (technologies && Array.isArray(technologies)) {
      return technologies.map((technology) => JSON.parse(technology));
    }

    if (technologies && typeof technologies === 'string') {
      return [JSON.parse(technologies)];
    }

    return [];
  }
}
