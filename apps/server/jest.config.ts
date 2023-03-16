import { JestConfigWithTsJest } from 'ts-jest';

const sharedConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  restoreMocks: true,
};

export default sharedConfig;
