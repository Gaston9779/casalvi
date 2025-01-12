/* import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to the database.");
      return;
    }

    console.log("Attempting to connect to the database...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    
    throw new Error("Failed to connect to database.");
  }
};


export default dbConnect;
 */
// lib/dbConnect.js
// lib/dbConnect.js
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In sviluppo, usa una connessione persistente per evitare problemi di connessione.
  clientPromise = client;
} else {
  // In produzione, usa il pool di connessioni.
  clientPromise = client.connect();
}

export default clientPromise;
