import mongoose from 'mongoose';
const AutoIncrement = require( 'mongoose-sequence' )( mongoose );

const QuoteSchema = new mongoose.Schema( {
  nomeClient: { type: String, required: false },
  descWork: { type: String, required: false },
  importoOfferto: { type: String, required: false },
  scadAsta: { type: String, required: false },
  status: { type: Boolean, required: false },
  note: { type: String, required: false },
  pdf: { type: String, required: false },
  idPrev: { type: Number, required: false },
} );

// Controlla se il modello esiste già
if ( !mongoose.models.Quote )
{
  // Applica il plugin AutoIncrement per l'auto incremento di idPrev
  QuoteSchema.plugin( AutoIncrement, { inc_field: 'idPrev' } );
}

// Crea o utilizza il modello esistente
const Quote = mongoose.models.Quote || mongoose.model( 'Quote', QuoteSchema );

export default Quote;
