/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testTimeout: 25000,
};
