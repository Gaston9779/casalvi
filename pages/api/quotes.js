import dbConnect from '../../lib/dbConnect';
import Quote from '../../models/Quote';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disabilitiamo il body parser di Next.js per la gestione manuale
  },
};

export default async function handler(req, res) {
  try {
    await dbConnect(); // Connessione al database

    if (req.method === 'GET') {
      const { id } = req.query;

      if (!id) {
        const quotes = await Quote.find({});
        return res.status(200).json(quotes);
      }

      const quote = await Quote.findOne({ idPrev: id });
      if (!quote) {
        return res.status(404).json({ message: 'Quote non trovata' });
      }
      return res.status(200).json(quote);
    }

    if (req.method === 'POST') {
      const chunks = [];
    
      req.on('data', (chunk) => chunks.push(chunk));
    
      req.on('end', async () => {
        try {
          const body = Buffer.concat(chunks).toString();
          const { nomeClient, descWork, importoOfferto, scadAsta, status, note, pdf } = JSON.parse(body);
    
          if (!nomeClient || !descWork || !pdf) {
            return res.status(400).json({ message: 'Dati mancanti o non validi' });
          }
    
          // Assicurati che pdf venga trattato come percorso relativo
          // Non fare la decodifica Base64, lo lasciamo come percorso relativo
          const filePath = pdf;  // pdf dovrebbe essere già il percorso relativo, come /uploads/1736341294773-file.pdf
    
          // Verifica se il file esiste nel percorso
          if (!fs.existsSync(path.join(__dirname, filePath))) {
            return res.status(400).json({ message: 'File non trovato' });
          }
    
          // A questo punto, si può continuare a salvare i dati nel database
          const newQuote = new Quote({
            nomeClient,
            descWork,
            importoOfferto,
            scadAsta,
            status,
            note,
            pdf: filePath,  // Salviamo il percorso relativo del file PDF
          });
    
          const savedQuote = await newQuote.save();
          return res.status(201).json(savedQuote);
    
        } catch (error) {
          console.error('Errore nella POST:', error);
          return res.status(500).json({ message: 'Errore interno del server', error: error.message });
        }
      });
    
      return;
    }
    
    

    if (req.method === 'PUT') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'idPrev è obbligatorio' });
      }

      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', async () => {
        try {
          const body = Buffer.concat(chunks).toString();
          const updateData = JSON.parse(body);

          const updatedQuote = await Quote.findOneAndUpdate(
            { idPrev: id },
            updateData,
            { new: true, runValidators: true }
          );

          if (!updatedQuote) {
            return res.status(404).json({ message: 'Quote non trovata' });
          }

          return res.status(200).json(updatedQuote);
        } catch (error) {
          console.error('Errore nella PUT:', error);
          return res.status(500).json({ message: 'Errore interno del server', error: error.message });
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'idPrev è obbligatorio' });
      }

      const deletedQuote = await Quote.findOneAndDelete({ idPrev: id });

      if (!deletedQuote) {
        return res.status(404).json({ message: 'Quote non trovata' });
      }

      if (deletedQuote.pdf) {
        const filePath = path.join(__dirname, '..', '..', 'public', deletedQuote.pdf);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      return res.status(200).json({ message: 'Quote cancellata con successo' });
    }

    return res.status(405).json({ message: 'Metodo non consentito' }); // Metodo non gestito
  } catch (error) {
    console.error('Errore server:', error);
    res.status(500).json({ message: 'Errore interno del server', error: error.message });
  }
}
