import { Router } from 'express';

import { getProductsByDate } from '../controllers/product';

const router: Router = Router();

router.get('/date', getProductsByDate);

export default router;
