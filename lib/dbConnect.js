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
// lib/mongodb.js
import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDb;
