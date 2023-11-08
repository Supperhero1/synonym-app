const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')
const path = require("path");
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["jest-extended/all"],
  modulePaths: [path.join('../',compilerOptions.baseUrl)],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
