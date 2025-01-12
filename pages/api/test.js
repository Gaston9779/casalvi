import mongoose from 'mongoose';
import dbConnect from '../../lib/dbConnect'; // Percorso al file di connessione

export default async function handler(req, res) {
  try {
    await dbConnect();
    const databases = await mongoose.connection.db.admin().listDatabases();
    res.status(200).json({ success: true, databases });
  } catch (error) {
    console.error('Errore API:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
