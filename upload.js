import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ottieni il percorso assoluto per la cartella uploads nella root del progetto
const uploadPath = path.resolve(__dirname, 'uploads');

// Verifica se la cartella 'uploads' esiste nella root, se no la crea
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configura Multer con il percorso desiderato
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Salva i file nella cartella 'uploads' nella root
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Imposta il nome del file come timestamp più estensione
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Crea l'upload middleware
const upload = multer({ storage: storage });

export default upload;
