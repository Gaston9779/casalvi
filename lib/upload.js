import { S3Client } from '@aws-sdk/client-s3'; // Importa il client di S3 dalla versione v3
import multer from 'multer';
import multerS3 from 'multer-s3';

// Configura il client di S3 con la versione v3
const s3Client = new S3Client({
  region: 'eu-north-1', // Usa la tua regione corretta
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  },
});

// Configura multer per l'upload su S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,  // Usa il client della versione v3
    bucket: 'casavi-uploads',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

export default upload;
