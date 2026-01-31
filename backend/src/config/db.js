import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    
    console.log("🔗 Connecting to MongoDB:", mongoUri.replace(/\/\/.*@/, "//***:***@"));
    
    const connectionInstance = await mongoose.connect(mongoUri);
    
    console.log("✅ MongoDB connected successfully!");
    console.log(`📊 Database: ${connectionInstance.connection.name}`);
    return connectionInstance;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("Full error details:", error);
    throw error; // Re-throw to let the server handle it
  }
};

export default connectDB;
