const { Asset } = require("parcel-bundler");
const localRequire = require("parcel-bundler/lib/utils/localRequire");
const browserslist = require('browserslist')

class JSAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = 'js';
  }

  async prepareTargets() {
    this.targetsList = []
    const reducer = (p, c) => p.concat(browserslist(c))
    const removeWhiteSpace = e => e.replace(' ', '')
    const unique = (v, i, self) => self.indexOf(v) === i
    let babelrc = await this.getConfig([".babelrc"]);
    if (babelrc && babelrc.presets && Array.isArray(babelrc.presets)) {
      const itemsHasTargets = babelrc.presets.filter(e => Array.isArray(e)).filter(e => e.length === 2)
      const targets = itemsHasTargets.length > 0 ? itemsHasTargets[0][1].targets : null
      if (typeof targets === 'object' && targets !== null) {
        const { browsers, esmodules, ...rest } = targets
        if (browsers) {
          if (Array.isArray(browsers)) {
            this.targetsList = browsers.reduce(reducer, []).map(removeWhiteSpace).filter(unique)
          } else if (typeof browsers === 'string') {
            this.targetsList = browserslist(browsers).map(removeWhiteSpace)
          }
        } else {
          this.targetsList = Object.entries(rest).map(([k, v]) => k + ' ' + v)

          this.targetsList = this.targetsList.reduce(reducer, []).map(removeWhiteSpace).filter(unique)
        }
      } else if (typeof targets === 'string') {
        this.targetsList = browserslist(browsers).map(removeWhiteSpace)
      }
    } else {
      this.targetsList = browserslist().map(removeWhiteSpace)
    }
  }

  async generate() {
    const nonScript = this.options.entryFiles.filter(e => ['ts', 'js', 'coffee'].indexOf(e.substring(e.lastIndexOf(".") + 1)) !== -1).length === 0
    const isRenderer = this.options.target === 'electron' && nonScript
    const isBrowserLike = this.options.target === 'browser' || isRenderer
    if (isBrowserLike) {
      await this.prepareTargets()
    }
    const esbuild = await localRequire("esbuild", this.name);
    const options = {
      sourcemap: this.options.sourceMaps
        ? "external"
        : false,
      sourcefile: this.relativeName,
      loader: 'js',
      fileName: this.relativeName,
      minify: this.options.minify
    }
    if(this.options.global){
      options.globalName = this.options.global
    }
    
    if (isBrowserLike) {
      options.format = 'iife'
      options.target = this.targetsList
    } else {
      // options.platform = 'node'
      options.format = 'cjs'
      // options.target = 'node'
      // options.target = 'node' + process.versions['node']
    }
    const transpiled = await esbuild.transform(this.contents, options)
    let sourceMap = transpiled.map;

    if (sourceMap) {
      sourceMap = JSON.parse(sourceMap);
      sourceMap.sources = [this.relativeName];
      sourceMap.sourcesContent = [this.contents];
    }
    return [
      {
        type: 'js',
        value: transpiled.code,
        map: sourceMap,
      },
    ];
  }

  generateErrorMessage(err) {
    const loc = err.loc;
    if (loc) {
      // Babel 7 adds its own code frame on the error message itself
      // We need to remove it and pass it separately.
      if (err.message.startsWith(this.name)) {
        err.message = err.message
          .slice(this.name.length + 1, err.message.indexOf('\n'))
          .trim();
      }

      err.codeFrame = codeFrame(this.contents, { start: loc });
      err.highlightedCodeFrame = codeFrame(
        this.contents,
        { start: loc },
        { highlightCode: true },
      );
    }

    return err;
  }
}

module.exports = JSAsset;