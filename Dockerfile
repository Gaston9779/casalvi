# Usa l'immagine base di Node.js
FROM node:18-alpine

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia il file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice nel container
COPY . .

# Crea la directory per gli upload (fuori da public)
RUN mkdir -p /app/uploads

# Imposta i permessi per la cartella degli uploads
RUN chmod -R 777 /app/uploads

# Espone la porta 3000
EXPOSE 3000

# Avvia il server Node.js (ad esempio, Next.js o un server personalizzato)
CMD [ "npm", "start" ]
