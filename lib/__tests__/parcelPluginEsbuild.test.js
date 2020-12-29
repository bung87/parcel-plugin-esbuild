// Const assert = require("assert");
const parcelPluginEsbuild = require("../index.js");

const Bundler = require("parcel-bundler");
const path = require("path");
const assertBundle = require("parcel-assert-bundle-tree");
// Const fs = require("fs");

// Const readFile = location =>
//   new Promise((resolve, reject) =>
//     fs.readFile(location, (err, data) => (err ? reject(err) : resolve(data)))
//   );

describe("Asset", () => {
  it("should ouput the js code...", async () => {
    // Init bundler
    const bundler = new Bundler(path.join(__dirname, "./example.ts"), {
      outDir: path.join(__dirname, "build"),
      watch: false,
      cache: false,
      hmr: false,
      logLevel: 0
    });
    // Register plugin
    parcelPluginEsbuild(bundler);

    // Bundle everything
    const bundle = await bundler.bundle();
    assertBundle(bundle, {
      type: "js",
      name: "example.js",
      childBundler: [
        {
          type: "map"
        }
      ]
    });
  }, 25000);
});
