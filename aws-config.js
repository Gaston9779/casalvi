import AWS from 'aws-sdk';

// Configura AWS S3 con le credenziali e l'endpoint specifico
AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1', // Usa la tua regione corretta
});

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://s3.eu-north-1.amazonaws.com'), // Aggiungi "https://"
});

