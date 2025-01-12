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
import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connesso a MongoDB');
  } catch (error) {
    console.error('Errore nella connessione a MongoDB', error);
    throw new Error('Impossibile connettersi a MongoDB');
  }
};

export default dbConnect;
