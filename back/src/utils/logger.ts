import loggerFactory from './loggerFactory';
import fs from 'fs';
import dotenv from 'dotenv';

import constants from '../constants/env';

dotenv.config();

const logsTargetPath = process.cwd() + '/logs';

// Check if Dir exists before creating it
if (!fs.existsSync(logsTargetPath)) {
  fs.mkdirSync(logsTargetPath);
}

const transports = (type: string) => {
  switch (type) {
    // it is an example. Can be replace by an elasticsearch, sentry or any other transporter
    case constants.PROD:
      return {
        type: 'file-rotate',
        options: {
          filename: 'product_hunt-%DATE%.log',
          datePattern: 'HH-DD-MM-YYYY',
          zippedArchive: true,
          dirname: logsTargetPath,
          maxSize: '20m',
        },
      };
    case constants.TEST:
      return {
        type: 'file-rotate',
        options: {
          datePattern: 'DD',
          filename: 'logger_test-%DATE%.log',
          dirname: logsTargetPath,
        },
      };
    default:
      return {
        type: 'console',
        options: {},
      };
  }
};

const loggerTransports: Array<TransportType> = [transports(process.env.ENV || constants.DEV)];

export default loggerFactory(loggerTransports);
