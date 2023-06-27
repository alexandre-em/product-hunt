import { Router } from 'express';
import { fetchProductByDate } from '../services/productHuntFetch';
import logger from '../utils/logger';

const router: Router = Router();

router.get('/date', async (req: any, res: any) => {
  try {
    const data = await fetchProductByDate(new Date(2021, 6, 27));

    logger.info('result', data);

    res.status(200).send(data);
  } catch (e) {
    logger.error(e);
    res.status(e.response.status).send(e.response.errors);
  }
});

export default router;
