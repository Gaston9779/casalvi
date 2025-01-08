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

# Esegui la build di Next.js
RUN npm run build

# Crea la directory per gli upload
RUN mkdir -p /app/uploads

# Imposta i permessi per la cartella degli uploads
RUN chmod -R 777 /app/uploads

# Espone la porta 3000
EXPOSE 3000

# Avvia il server Node.js
CMD [ "npm", "start" ]
