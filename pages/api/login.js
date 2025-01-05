export default async function handler ( req, res )
{
  if ( req.method === 'POST' )
  {
    const { username, password } = req.body;

    // Logica per la verifica delle credenziali
    if ( username === 'casavi_read' && password === 'casavi_lettura' )
    {
      res.status( 200 ).json( { message: 'Login successful', username } );
    } else if ( username === 'casavi_admin' && password === 'casavi_amministratore' )
    {


      res.status( 200 ).json( { message: 'Login successful', username } );

    }
    else
    {
      res.status( 401 ).json( { message: 'Invalid credentials' } );
    }

  } else if ( req.method === 'GET' )
  {
    // Simula una lista di utenti con ruoli
    const users = [
      { username: 'casavi_read', role: 'casavi_lettura' },
      { username: 'casavi_admin', role: 'casavi_amministratore' },
    ];

    res.status( 200 ).json( users );
  } else
  {
    res.status( 405 ).json( { message: 'Method Not Allowed' } );
  }
}
