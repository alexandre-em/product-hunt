import { Router } from 'express';

import { getCollections } from '../controllers/collection';

const router: Router = Router();

router.get('/', getCollections);

export default router;
