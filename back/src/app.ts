import dotenv from 'dotenv';

import app from './config/server';
import logger from './config/logger';

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`API is listening on port ${port}`);
});
