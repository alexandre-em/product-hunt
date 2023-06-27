import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import logger from './utils/logger';
import products from './controllers/product';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/products', products);

app.listen(port, () => {
  logger.info(`API is listening at http://localhost:${port}`);
});
