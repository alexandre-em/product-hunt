import express from 'express';
import cors from 'cors';

import products from '../routes/product';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', products);

export default app;
