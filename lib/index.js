"use strict";

module.exports = function(bundler) {
  // bundler.addPackager("ts_raw", require.resolve("./packagers/TSPackager.js"));
  // bundler.addPackager("tsx_raw", require.resolve("./packagers/TSXPackager.js"));
  // bundler.addAssetType("ts", require.resolve("./assets/TypeScriptRawAsset.js"));
  // bundler.addAssetType("tsx", require.resolve("./assets/TSXRawAsset.js"));
  bundler.addAssetType("ts", require.resolve("./assets/TypeScriptAsset.js"));
  bundler.addAssetType("tsx", require.resolve("./assets/TypeScriptAsset.js"));
  
};
