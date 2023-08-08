/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  moduleDirectories: ['node_modules'],
  rootDir: '../../',
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
};
