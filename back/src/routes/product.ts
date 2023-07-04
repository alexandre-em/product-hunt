import { Router, Request, Response } from 'express';
import { fetchProductByDate } from '../services/productHuntFetch';
import logger from '../config/logger';

const router: Router = Router();

router.get('/date', async (req: Request, res: Response) => {
  try {
    const { before, after, next } = req.query;

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
});

export default router;
