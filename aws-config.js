const AWS = require('aws-sdk');

// Usa le variabili d'ambiente, non hardcodificare le chiavi nel codice
const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY;
const region = process.env.MY_AWS_REGION;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});
