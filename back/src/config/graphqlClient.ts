import { GraphQLClient } from 'graphql-request';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

logger.info('Instancing a graphQL client');

const headers = {
  authorization: 'Bearer ' + process.env.PRODUCT_HUNT_TOKEN,
};

const options = {
  headers,
};

if (!process.env.PRODUCT_HUNT_URL) {
  logger.error(`Product hunt url is "null" value: ${process.env.PRODUCT_HUNT_URL}, please check env var`);
}

export default new GraphQLClient(process.env.PRODUCT_HUNT_URL || '', options);
