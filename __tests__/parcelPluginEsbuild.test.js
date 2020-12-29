const parcelPluginEsbuild = require("../lib/index.js");
const { performance } = require("perf_hooks");
const Bundler = require("parcel-bundler");
const path = require("path");
const assertBundle = require("parcel-assert-bundle-tree");

describe("compile ts with builtin typescript", () => {
  it("should ouput the js code...", async () => {
    // Init bundler
    const t1 = performance.now();

    const bundler = new Bundler(path.join(__dirname, "./example.ts"), {
      outDir: path.join(__dirname, "build"),
      watch: false,
      cache: false,
      hmr: false,
      logLevel: 0
    });

    // Bundle everything
    const bundle = await bundler.bundle();
    console.log(`typescript takes ${performance.now() - t1}ms`);
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

describe("compile ts with esbuild", () => {
  it("should ouput the js code...", async () => {
    // Init bundler
    const t1 = performance.now();

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
    console.log(`esbuild takes ${performance.now() - t1}ms`);
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
