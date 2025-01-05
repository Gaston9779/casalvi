const users = {
    reader: {
      username: 'casavi_read',
      password: 'casavi_lettura',
      role: 'read',
    },
    editor: {
      username: 'casavi_admin',
      password: 'casavi_amministratore',
      role: 'edit',
    },
  };
  
  export function authenticate(username, password) {
    for (const user of Object.values(users)) {
      if (user.username === username && user.password === password) {
        return user.role; // Restituisce il ruolo se autenticato
      }
    }
    return null; // Non autenticato
  }
  