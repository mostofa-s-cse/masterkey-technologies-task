import app from './app';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Start the Express server
    app.listen(PORT, () => {
      const serverUrl = `http://localhost:${PORT}`;
      console.log(`Server is running on port ${PORT}`);
      console.log(`API is available at: ${serverUrl}/api`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
