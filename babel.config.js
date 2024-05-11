module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      'react-native-reanimated/plugin' //react-native-reanimated/plugin has to be listed last
    ],
  };
};
