/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterSetup: ["./src/__tests__/setup.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "json", "html", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/", "/__tests__/"],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 35,
      lines: 40,
      statements: 40,
    },
  },
};
