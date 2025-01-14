import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

// Configura AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Inserisci le tue credenziali AWS
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-central-1', // Sostituisci con la tua regione
});

// Configura multer per l'upload su S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'casavi-uploads', // Nome del tuo bucket S3
    acl: 'public-read', // Impostazioni per la visibilità del file
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // Usa il nome del file come chiave su S3
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

export default upload;
