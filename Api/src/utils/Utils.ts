export function getFileUrl(file: Express.Multer.File) {
  return `${process.env.API_URL}/public/${file.mimetype.split('/')[0]}/${file.originalname}`;
}

export function getFilesUrl(files: Express.Multer.File[]) {
  return files.map((image) => getFileUrl(image));
}

export function getImagesFiles(files: Express.Multer.File[]) {
  if (files && 'images' in files && (files.images as Express.Multer.File[]).length) {
    return getFilesUrl(files.images as Express.Multer.File[]);
  }

  return [];
}

export function getLogoFile(files: Express.Multer.File[]) {
  if (files && 'logo' in files && (files.logo as Express.Multer.File[]).length) {
    return getFilesUrl(files.logo as Express.Multer.File[])[0];
  }

  return '';
}
