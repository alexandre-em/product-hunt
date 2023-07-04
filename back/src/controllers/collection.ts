import { Request, Response } from 'express';
import { fetchCollections } from '../services/collections';
import logger from '../config/logger';

export const getCollections = async (req: Request, res: Response) => {
  try {
    const { next } = req.query;
    logger.info('Fetching collections : ');

    const data = await fetchCollections(next as string);

    logger.info('Response status fetch collections : 200');

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
