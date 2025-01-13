import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  nomeClient: String,
  descWork: String,
  importoOfferto: String,
  scadAsta: String,
  status: Boolean,
  note: String,
  pdf: String,
  idPrev: Number,
});

export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);
