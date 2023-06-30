import { Router, Request, Response } from 'express';
import { fetchProductByDate } from '../services/productHuntFetch';
import logger from '../utils/logger';

const router: Router = Router();

router.get('/date', async (req: Request, res: Response) => {
  try {
    const data = await fetchProductByDate(
      new Date(2021, 6, 27, 0, 0, 0).toISOString(),
      new Date(2021, 6, 27, 23, 59, 59).toISOString()
    );

    logger.info('result', data);

    res.status(200).send(data);
  } catch (e) {
    logger.error(e);
    res.status(e.response.status).send(e.response.errors);
  }
});

export default router;
