import crypto from 'crypto';
import multer, { Options } from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = resolve(tmpFolder, 'uploads');

interface IUploadsConfigs extends Options {
  tmpFolder: string;
  uploadsFolder: string;
}

export default {
  tmpFolder,

  uploadsFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(_, file, cb) {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err, null);
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        return cb(null, fileName);
      });
    },
  }),

  limits: {
    files: 1,
    fields: 10,
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (_, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png',
      'image/svg',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid file mimetype. Only allowed: .jpeg, .jpg, .pjpeg or .png'
        )
      );
    }
  },
} as IUploadsConfigs;
