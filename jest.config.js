module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "tsconfig.jest.json",
      useBabelrc: true,
    },
  },
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|svg)(\\?[a-z]+)?$":
      "<rootDir>/src/__mocks__/ImageStub.ts",
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/ImageStub.ts",
    "^src/(.*)$": "<rootDir>/src/$1",
    "^public/(.*)$": "<rootDir>/public/$1",
  },
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  setupFiles: ['./jestSetup.js'],
  setupFilesAfterEnv: ["./jestAfterSetup.ts"],
}
