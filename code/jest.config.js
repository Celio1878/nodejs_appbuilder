module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
};
