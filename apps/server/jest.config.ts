module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  globalSetup: '<rootDir>/src/test/globalSetup.ts',
  globalTeardown: '<rootDir>/src/test/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupFile.ts'],
  restoreMocks: true,
  setupFiles: ['dotenv/config'],
  testTimeout: 10000,
  collectCoverage: false,
  // collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/vendor/**'],
  // coveragePathIgnorePatterns: ['jest.config.js', '/config/*', 'routes'],
  // reporters: [
  //   'default',
  //   [
  //     './node_modules/jest-html-reporter',
  //     {
  //       pageTitle: 'Test Report',
  //       includeFailureMsg: true,
  //       includeConsoleLog: true,
  //     },
  //   ],
  // ],
};
