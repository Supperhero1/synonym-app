import { Config } from '@jest/types'
import { compilerOptions } from '../tsconfig.json'
import path from "path";

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ["jest-extended/all"],
    modulePaths: [path.join('../', compilerOptions.baseUrl)],
    globalSetup: '<rootDir>/testSetup.ts',
    globalTeardown: '<rootDir>/testTeardown.ts',
    moduleNameMapper: {
        "@/(.*)$": "<rootDir>/../src/$1"
    }
}

module.exports = config
