import dbConnect from '../../../lib/dbConnect';
import Quote from '../../../models/Quote';

export default async function handler(req, res) {
  const { id } = req.query; // Otteniamo l'ID dalla query (ad esempio, /api/quotes/123)

  // Verifica se l'ID è presente
  if (!id) {
    return res.status(400).json({ message: 'id è obbligatorio' });
  }

  await dbConnect(); // Connessione al database

  if (req.method === 'GET') {
    try {
      const quote = await Quote.findOne({ idPrev: id });
      if (!quote) {
        return res.status(404).json({ message: 'Quote non trovata' });
      }
      return res.status(200).json(quote); // Restituisce la quote
    } catch (error) {
      console.error('Errore nel recupero della quote:', error);
      return res.status(500).json({ message: 'Errore del server' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedData = req.body; // Ottieni i dati inviati nel body

      // Trova e aggiorna la quote con l'ID specificato
      const updatedQuote = await Quote.findOneAndUpdate(
        { idPrev: id }, // Cerca la quote con idPrev corrispondente
        updatedData, // I nuovi dati
        { new: true, runValidators: true } // Ritorna l'oggetto aggiornato e valida i dati
      );

      if (!updatedQuote) {
        return res.status(404).json({ message: 'Quote non trovata' });
      }

      return res.status(200).json(updatedQuote); // Restituisce la quote aggiornata
    } catch (error) {
      console.error('Errore nell\'aggiornamento della quote:', error);
      return res.status(500).json({ message: 'Errore nel server' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedQuote = await Quote.findOneAndDelete({ idPrev: id });

      if (!deletedQuote) {
        return res.status(404).json({ message: 'Quote non trovata' });
      }

      return res.status(200).json({ message: 'Quote cancellata con successo' });
    } catch (error) {
      console.error('Errore nella cancellazione della quote:', error);
      return res.status(500).json({ message: 'Errore del server' });
    }
  }

  return res.status(405).json({ message: 'Metodo non consentito' }); // Metodo non supportato
}
