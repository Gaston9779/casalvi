// models/Quote.js
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  nomeClient: { type: String, required: true },
  descWork: { type: String, required: true },
  importoOfferto: { type: String, required: true },
  scadAsta: { type: String, required: true },
  status: { type: Boolean, required: true },
  note: { type: String, required: true },
  pdf: { type: String, required: true },
  idPrev: { type: Number, required: true },
});

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
