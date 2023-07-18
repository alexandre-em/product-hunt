import express from 'express';
import cors from 'cors';

import products from '../routes/product';
import collections from '../routes/collection';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/api/products', products);
app.use('/v1/api/collections', collections);

export default app;
