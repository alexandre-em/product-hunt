import fs from 'fs';
import dotenv from 'dotenv';

import logger from '../logger';
import constants from '../../constants/env';

dotenv.config();

describe('Logger Test', () => {
  it('should test if logger is instantiated', () => {
    expect(logger).toBeDefined();
  });

  it('should write logs on a file', async () => {
    const logsTargetPath = process.cwd() + '/logs';
    const date = new Date().getDate();
    const logsFileTargetPath = logsTargetPath + `/logger_test-${date < 10 ? `0${date}` : date}.log`;

    if (fs.existsSync(logsTargetPath)) {
      if (fs.existsSync(logsFileTargetPath)) {
        fs.rmSync(logsFileTargetPath);
      }
    } else {
      fs.mkdirSync(logsTargetPath);
    }
    expect(process.env.ENV).toBe(constants.TEST); // Check if directory has been created

    expect(fs.existsSync(logsTargetPath)).toBe(true); // Check if directory has been created
    expect(fs.existsSync(logsFileTargetPath)).toBe(false); // Check if logger test file has not already been created

    logger.info('test writting log file');

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Waiting for the file to be created

    expect(fs.existsSync(logsFileTargetPath)).toBe(true); // Check if log file has been created
  });
});
