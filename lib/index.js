"use strict";

module.exports = function(bundler) {
  bundler.addAssetType("ts", require.resolve("./assets/TypeScriptAsset.js"));
  bundler.addAssetType("tsx", require.resolve("./assets/TypeScriptAsset.js"));
};
