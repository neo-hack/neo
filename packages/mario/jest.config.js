/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  testEnvironment: 'jest-environment-node',
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './jest/coverage',
  testTimeout: 600000,
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  extensionsToTreatAsEsm: ['.ts'],
  testRegex: '/test/.+\\.test\\.ts?$',
  verbose: true,
}
