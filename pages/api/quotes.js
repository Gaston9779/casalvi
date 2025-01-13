import dbConnect from '../../lib/dbConnect';
import Quote from '../../models/Quote';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const quotes = await Quote.find(); // Recupera tutte le quotes
      res.status(200).json(quotes);
    } catch (error) {
      console.error('Errore nel recupero delle quotes:', error);
      res.status(500).json({ error: 'Errore nel recupero delle quotes' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
