import dbConnect from '../../lib/dbConnect';
import Quote from '../../models/Quote';
import upload from '../../lib/upload'; // Middleware di upload

export const config = {
  api: {
    bodyParser: false, // Disabilita il body parser predefinito di Next.js
  },
};

export default async function handler ( req, res )
{
  await dbConnect();

  const { method, body, query } = req;

  switch ( method )
  {
    case 'GET':
      try
      {
        const quotes = await Quote.find();
        res.status( 200 ).json( quotes );
      } catch ( error )
      {
        console.error( 'Errore nel recupero delle quotes:', error );
        res.status( 500 ).json( { error: 'Errore nel recupero delle quotes' } );
      }
      break;

    case 'POST':
      upload.single( 'pdf' )( req, res, async ( err ) =>
      {
        if ( err )
        {
          console.error( "Errore nell'upload del file:", err );
          return res.status( 500 ).json( {
            error: "Errore nell'upload del file",
            details: err.message,
          } );
        }

        if ( !req.file )
        {
          return res.status( 400 ).json( { error: 'File non caricato correttamente' } );
        }

        try
        {
          // Ottieni l'ultimo valore di idPrev
          const lastQuote = await Quote.findOne().sort( { idPrev: -1 } ).exec();
          const newIdPrev = lastQuote ? lastQuote.idPrev + 1 : 1;

          // Estrai i dati dal body e dal file
          const { nomeClient, descWork, importoOfferto, scadAsta, status, note } = req.body;
          const pdf = req.file?.location;  // Usa `location` per il percorso S3 del file

          console.log( req.file, 'file ricevuto' );
          console.log( req.body, 'dati ricevuti' );

          // Crea la nuova quote
          const newQuote = new Quote( {
            nomeClient,
            descWork,
            importoOfferto,
            scadAsta,
            status,
            note,
            pdf,
            idPrev: newIdPrev,
          } );

          console.log( newQuote, 'quote creata' );
          console.log( 'File PDF salvato in:', pdf );

          // Salva la quote
          const savedQuote = await newQuote.save();
          res.status( 201 ).json( savedQuote );  // Risposta con la quote appena creata
        } catch ( error )
        {
          console.error( 'Errore nella creazione della quote:', error );
          res.status( 500 ).json( {
            error: 'Errore nella creazione della quote',
            details: error.message,
          } );
        }
      } );
      break;

    case 'PUT':
      try
      {
        const { id } = query;
        const updatedQuote = await Quote.findByIdAndUpdate( id, body, { new: true } );
        if ( !updatedQuote )
        {
          return res.status( 404 ).json( { error: 'Quote non trovata' } );
        }
        res.status( 200 ).json( updatedQuote );
      } catch ( error )
      {
        console.error( "Errore nell'aggiornamento della quote:", error );
        res.status( 500 ).json( { error: "Errore nell'aggiornamento della quote" } );
      }
      break;

    case 'DELETE':
      try
      {
        const { idPrev } = query; // Usa idPrev invece di id
        const deletedQuote = await Quote.findOneAndDelete( { idPrev } ); // Esegui la cancellazione usando idPrev
        if ( !deletedQuote )
        {
          return res.status( 404 ).json( { error: 'Quote non trovata con idPrev specificato' } );
        }
        res.status( 200 ).json( { message: 'Quote eliminata con successo' } );
      } catch ( error )
      {
        console.error( 'Errore nella cancellazione della quote:', error );
        res.status( 500 ).json( { error: 'Errore nella cancellazione della quote' } );
      }
      break;

    default:
      res.setHeader( 'Allow', [ 'GET', 'POST', 'PUT', 'DELETE' ] );
      res.status( 405 ).end( `Metodo ${ method } non consentito` );
      break;
  }
}
