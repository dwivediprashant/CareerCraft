import connectDB from "./config/db.js";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 10000; // Default to Render's port

// Validate critical environment variables
const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    console.error('Please set these in your Render dashboard:');
    missing.forEach(key => console.error(`- ${key}`));
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated');
};

// const dropProblematicIndex = async () => {
//   try {
//     // Import the Resume model
//     const { default: Resume } = await import('./models/resume.model.js');

//     // Try to drop the index
//     await Resume.collection.dropIndex('cloudinaryPublicId_1');
//     console.log('✅ Dropped problematic index');
//   } catch (err) {
//     // Index doesn't exist, which is fine
//     if (err.code === 26) {
//       console.log('ℹ️ Index does not exist (code 26) - this is fine');
//     } else {
//       console.log('ℹ️ Index drop attempt (other error):', err.message);
//     }
//   }
// };

// Start server with better error handling
const startServer = async () => {
  try {
    console.log('🚀 Starting CareerCraft Backend...');
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔌 Port: ${PORT}`);
    
    // Validate environment variables
    validateEnv();
    
    console.log('🔗 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB connected successfully');

    // Drop the problematic index
    // await dropProblematicIndex();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

startServer();
