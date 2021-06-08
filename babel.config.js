module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "module:metro-react-native-babel-preset",
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
    env: {
      development: {
        plugins: ["transform-react-jsx-source"],
      },
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
