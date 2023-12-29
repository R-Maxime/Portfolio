export function getFileUrl(file: Express.Multer.File) {
  return `${process.env.API_URL}/public/${file.mimetype.split('/')[0]}/${file.originalname}`;
}

export function getFilesUrl(files: Express.Multer.File[]) {
  return files.map((image) => getFileUrl(image));
}
