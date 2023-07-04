import { Request, Response } from 'express';
import { fetchProductByDate } from '../services/product';
import logger from '../config/logger';

export const getProductsByDate = async (req: Request, res: Response) => {
  try {
    const { before, after, next } = req.query;

    logger.info('Fetching product by date: ', after);

    const data = await fetchProductByDate(after as string, before as string, next as string);

    logger.info('Response status fetch product by date: 200');

    res.status(200).send(data);
  } catch (e) {
    logger.error(e);

    if (e?.response?.status) {
      res.status(e.response.status === 200 ? 400 : e.response.status).send(e.response.errors);
    } else {
      res.status(500).send(e);
    }
  }
};
