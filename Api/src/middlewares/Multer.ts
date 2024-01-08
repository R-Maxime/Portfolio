import multer, { Multer } from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const publicPath = process.env.PUBLIC_PATH || path.join(__dirname, '..', '..', 'public');
    const destinationFolder = path.join(publicPath, file.mimetype.split('/')[0]);

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerConfig: Multer = multer({
  storage,
});

export default multerConfig;
