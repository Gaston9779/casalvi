// upload.js
import multer from 'multer';
import path from 'path';

// Percorso assoluto della cartella 'uploads'
const uploadPath = path.resolve('uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Usa il percorso assoluto per 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome del file basato su timestamp
  },
});

const upload = multer({ storage: storage });

export default upload;
