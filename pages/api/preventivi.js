// pages/api/preventivi.js
import dbConnect from '../../lib/dbConnect';  // Importa la funzione di connessione
import Quote from '../../models/Quote';  // Importa il modello Quote

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Parametro id mancante' });
    }

    try {
      // Connetti al database
      await dbConnect();

      // Cerca il preventivo con idPrev
      const preventivo = await Quote.findOne({ idPrev: id });

      if (preventivo) {
        return res.status(200).json(preventivo);  // Restituisci il preventivo trovato
      } else {
        return res.status(404).json({ message: 'Preventivo non trovato' });
      }
    } catch (error) {
      console.error('Errore nel server:', error);
      return res.status(500).json({ message: 'Errore nel server', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Metodo non consentito' });
  }
}
