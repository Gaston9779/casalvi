/* import dbConnect from '../../lib/dbConnect';
import Quote from '../../models/Quote';
import fs from 'fs';
import path from 'path';
import upload from '../../upload'; // Importa la configurazione di Multer

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
      // Usa Multer per caricare un singolo file
      upload.single('pdf')(req, res, async (err) => {
        if (err) {
          // Gestisci l'errore
          return res.status(500).json({ message: 'Errore nel caricamento del file', error: err });
        }
  
        // Estrai i dati dal corpo della richiesta
        const { nomeClient, descWork, importoOfferto, scadAsta, status, note } = req.body;
  
        // Verifica che il file sia stato caricato
        const pdfPath = req.file ? '/uploads/' + req.file.filename : ''; // Salva solo il percorso relativo del file
  
        if (!nomeClient || !descWork || !pdfPath) {
          return res.status(400).json({ message: 'Dati mancanti o non validi' });
        }
  
        // Crea una nuova quotazione nel database
        const newQuote = new Quote({
          nomeClient,
          descWork,
          importoOfferto,
          scadAsta,
          status,
          note,
          pdf: pdfPath, // Salva solo il percorso relativo del file
        });
  
        try {
          const savedQuote = await newQuote.save(); // Salva la quotazione nel DB
          return res.status(201).json(savedQuote); // Restituisci la risposta con la quotazione salvata
        } catch (error) {
          console.error('Errore nel salvataggio della quotazione:', error);
          return res.status(500).json({ message: 'Errore nel salvataggio della quotazione', error: error.message });
        }
      });
      return;
    } else {
      res.status(405).json({ message: 'Metodo non supportato' });
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
 */
import clientPromise from "../../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Recupera la connessione al client
      const client = await clientPromise;
      
      // Accedi al database (in questo caso "test")
      const db = client.db("test");  // Sostituisci con il nome del tuo database
      
      // Accedi alla collection "quotes"
      const quotes = await db.collection("quotes").find({}).toArray();

      // Invia la risposta con le quote
      res.status(200).json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
