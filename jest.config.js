const esModules = [
  "@react-native-async-storage/async-storage/jest/async-storage-mock",
].join("|");

module.exports = {
  verbose: true,
  preset: "react-native",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/assets/"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "./setup-tests.js",
  ],
};
