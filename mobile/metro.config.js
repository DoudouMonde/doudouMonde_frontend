const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// 모노레포를 위한 resolver 설정
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    "@doudoumonde/shared": path.resolve(__dirname, "../packages/shared/src"),
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });
