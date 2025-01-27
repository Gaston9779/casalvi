# Usa l'immagine base di Node.js
FROM node:18-alpine

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia il file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia le cartelle necessarie nel container
COPY ./next ./pages
COPY ./public ./public

# Crea la directory per gli upload (fuori da public)
RUN mkdir -p /app/uploads

# Imposta i permessi per la cartella degli uploads per assicurarci che sia scrivibile
RUN chmod -R 777 /app/uploads

# Costruisci il progetto Next.js
RUN npm run build

# Rimuovi node_modules per ridurre le dimensioni dell'immagine finale
RUN rm -fr node_modules

# Installa serve per servire l'applicazione in produzione
RUN npm install -g serve

# Espone la porta 3000
EXPOSE 3000

# Crea un volume per la cartella uploads (dove i file verranno caricati)
VOLUME /app/uploads

# Comando per avviare l'applicazione con serve
CMD [ "serve", "-s", "build" ]
