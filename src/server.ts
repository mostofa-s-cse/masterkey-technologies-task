import app from './app';
import dotenv from 'dotenv';
import pool from './database/db';

// Load environment variables from .env file
dotenv.config();

// Get the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Function to start the server
const startServer = async () => {
  try {
    // Check database connection
    await pool.connect();
    console.log('Successfully connected to the database.');

    // Start the Express server
    app.listen(PORT, () => {
      const serverUrl = `http://localhost:${PORT}`;
      console.log(`Server is running on port ${PORT}`);
      console.log(`API is available at: ${serverUrl}/api`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the server
startServer();
