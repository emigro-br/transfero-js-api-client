/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  modulePathIgnorePatterns: ['/dist/'],
  moduleNameMapper: {
    '^@/mocks/(.*)$': '<rootDir>/src/tests/__mocks__/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
