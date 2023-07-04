import express from 'express';
import cors from 'cors';

import products from '../routes/product';
import collections from '../routes/collection';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', products);
app.use('/api/collections', collections);

export default app;
