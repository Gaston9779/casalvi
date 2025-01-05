import { NextResponse } from 'next/server';

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Escludi esplicitamente la rotta di login
  if (pathname.startsWith('/api/login')) {
    console.log('Permesso accesso a /api/login senza controllo ruolo');
    return NextResponse.next();
  }

  // Leggi il ruolo dal header (o sessionStorage, cookie, ecc.)
  const role = req.headers.get('x-role'); // Puoi leggere il ruolo dal header o da un cookie

  // Se non c'è ruolo, permetti l'accesso senza restrizioni
  if (!role) {
    console.log('Ruolo mancante, ma l\'accesso è consentito.');
    return NextResponse.next();
  }

  // Rotte per cui i ruoli hanno accesso
  const authorizedRoutes = {
    read: ['/api/quotes'],
    edit: ['/api/quotes', '/api/edit'],
  };

  // Se il ruolo non è valido, permette comunque la richiesta senza errore
  if (!(role in authorizedRoutes)) {
    console.log('Ruolo non valido, ma l\'accesso è consentito.');
    return NextResponse.next();
  }

  // Verifica se la rotta è consentita per il ruolo
  const userRoutes = authorizedRoutes[role];
  console.log('Rotte per il ruolo:', userRoutes);

  if (!userRoutes.some(route => pathname.startsWith(route))) {
    console.log('Accesso negato per la rotta', pathname);
    // Puoi evitare di restituire un errore per il "Forbidden" e semplicemente permettere l'accesso
    return NextResponse.next();
  }

  // Se tutto è ok, permette la richiesta
  return NextResponse.next();
}
