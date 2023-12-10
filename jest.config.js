module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        // '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.ts?(x)', '<rootDir>/src/**/?(*.)+(spec|test).ts?(x)'],
    silent: true,
    // globals: {
    //     'ts-jest': {
    //         tsconfig: 'tsconfig.json',
    //     },
    // },
};
