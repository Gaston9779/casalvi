import dbConnect from '../../lib/dbConnect';
import Quote from '../../models/Quote';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disabilitiamo il body parser di Next.js per la gestione manuale
  },
};

export default async function handler ( req, res )
{
  try
  {
    await dbConnect(); // Connessione al database

    // Metodo GET per ottenere le citazioni
    if ( req.method === 'GET' )
    {
      const { id } = req.query;

      if ( !id )
      {
        const quotes = await Quote.find( {} );
        return res.status( 200 ).json( quotes );
      }

      const quote = await Quote.findOne( { idPrev: id } );
      if ( !quote )
      {
        return res.status( 404 ).json( { message: 'Quote non trovata' } );
      }
      return res.status( 200 ).json( quote );
    }

    // Metodo POST per salvare una nuova citazione e un PDF
    if ( req.method === 'POST' )
    {
      const chunks = [];

      req.on( 'data', ( chunk ) => chunks.push( chunk ) );
      req.on( 'end', async () =>
      {
        try
        {
          const body = Buffer.concat( chunks ).toString();
          const { nomeClient, descWork, importoOfferto, scadAsta, status, note, pdf } = JSON.parse( body );

          if ( !nomeClient || !descWork || !pdf )
          {
            return res.status( 400 ).json( { message: 'Dati mancanti o non validi' } );
          }

          const buffer = Buffer.from( pdf, 'base64' );
          const fileName = `${ Date.now() }-file.pdf`;

          // Percorso della cartella per gli upload
          const uploadDir = path.join( process.cwd(), 'uploads' ); // Usa process.cwd() per ottenere il percorso radice del progetto

          console.log( 'Upload directory:', uploadDir ); // Log per il percorso

          // Verifica se la cartella esiste, altrimenti crea la cartella
          if ( !fs.existsSync( uploadDir ) )
          {
            console.log( 'Cartella uploads non trovata, la sto creando...' );
            fs.mkdirSync( uploadDir, { recursive: true } );
          } else
          {
            console.log( 'Cartella uploads trovata.' );
          }

          // Scrittura del file PDF nella cartella
          const filePath = path.join( uploadDir, fileName );
          fs.writeFileSync( filePath, buffer ); // Salva il file nel percorso

          // Crea un nuovo record nel database
          const newQuote = new Quote( {
            nomeClient,
            descWork,
            importoOfferto,
            scadAsta,
            status,
            note,
            pdf: `/uploads/${ fileName }`, // Salva il percorso relativo del file
          } );

          const savedQuote = await newQuote.save();
          return res.status( 201 ).json( savedQuote );
        } catch ( error )
        {
          console.error( 'Errore nella POST:', error );
          return res.status( 500 ).json( { message: 'Errore interno del server', error: error.message } );
        }
      } );
      return; // Evita di proseguire ulteriormente
    }

    // Metodo PUT per aggiornare una citazione esistente
    if ( req.method === 'PUT' )
    {
      const { id } = req.query;

      if ( !id )
      {
        return res.status( 400 ).json( { message: 'idPrev è obbligatorio' } );
      }

      const chunks = [];
      req.on( 'data', ( chunk ) => chunks.push( chunk ) );
      req.on( 'end', async () =>
      {
        try
        {
          const body = Buffer.concat( chunks ).toString();
          const updateData = JSON.parse( body );

          const updatedQuote = await Quote.findOneAndUpdate(
            { idPrev: id },
            updateData,
            { new: true, runValidators: true }
          );

          if ( !updatedQuote )
          {
            return res.status( 404 ).json( { message: 'Quote non trovata' } );
          }

          return res.status( 200 ).json( updatedQuote );
        } catch ( error )
        {
          console.error( 'Errore nella PUT:', error );
          return res.status( 500 ).json( { message: 'Errore interno del server', error: error.message } );
        }
      } );
      return;
    }

    // Metodo DELETE per cancellare una citazione esistente
    if ( req.method === 'DELETE' )
    {
      const { id } = req.query;

      if ( !id )
      {
        return res.status( 400 ).json( { message: 'idPrev è obbligatorio' } );
      }

      const deletedQuote = await Quote.findOneAndDelete( { idPrev: id } );

      if ( !deletedQuote )
      {
        return res.status( 404 ).json( { message: 'Quote non trovata' } );
      }

      if ( deletedQuote.pdf )
      {
        const filePath = path.join( process.cwd(), 'uploads', deletedQuote.pdf.split( '/' ).pop() );
        if ( fs.existsSync( filePath ) )
        {
          fs.unlinkSync( filePath ); // Elimina il file PDF associato
        }
      }

      return res.status( 200 ).json( { message: 'Quote cancellata con successo' } );
    }

    return res.status( 405 ).json( { message: 'Metodo non consentito' } );
  } catch ( error )
  {
    console.error( 'Errore server:', error );
    res.status( 500 ).json( { message: 'Errore interno del server', error: error.message } );
  }
}
