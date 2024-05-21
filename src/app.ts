import express from 'express';
import bodyParser from 'body-parser';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Apply rate limiting middleware to all routes under /api
app.use('/api/', rateLimiter);

// Setup the API routes
app.use('/api/', routes);

// Default route to handle root requests
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Platform API');
});

export default app;

