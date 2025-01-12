// models/Quote.js
import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  nomeClient: String,
  descWork: String,
  importoOfferto: String,
  scadAsta: String,
  status: Boolean,
  note: String,
  pdf: String,
  idPrev: Number,
});

const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);

export default Quote;
