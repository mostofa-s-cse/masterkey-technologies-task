import express from 'express';
import bodyParser from 'body-parser';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';
import { syncDatabase } from './database';

const app = express();

app.use(bodyParser.json());
app.use('/api/', rateLimiter);
app.use('/api/', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Platform API');
});

// Sync database before starting the server
syncDatabase();

export default app;
