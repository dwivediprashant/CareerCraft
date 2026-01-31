import connectDB from "./config/db.js";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

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

connectDB()
  .then(async () => {
    // Drop the problematic index
    // await dropProblematicIndex();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
