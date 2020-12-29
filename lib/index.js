"use strict";

module.exports = function(bundler) {
  bundler.addAssetType("ts", require.resolve("./assets/TypeScriptAsset.js"));
};
