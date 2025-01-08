// upload.js
import multer from 'multer';
import path from 'path';

// Configura Multer per salvare i file nella cartella 'public/uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Dove vuoi che vengano salvati i file
  },
  filename: (req, file, cb) => {
    // Usa un timestamp e l'estensione del file originale per il nome del file
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Configurazione di Multer
const upload = multer({ storage: storage });

export default upload;
