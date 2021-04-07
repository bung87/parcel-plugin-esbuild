# parcel-plugin-esbuild [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> 

Simple works drop-in replacement for parcel's builtins.  

Currently support `ts`,`tsx`

According to esbuild document remain js assets use parcel's builtins:  
> Transforming ES6+ syntax to ES5 is not supported yet.   
> The CSS content type is new and is still a work in progress. 

## Known issues  

Not work well with javascript's `meta data` api  

## Installation

```sh
$ npm install --save-dev parcel-plugin-esbuild esbuild
$ yarn add parcel-plugin-esbuild esbuild -D
```
## Validation  
transformer  
append `--no-minify --no-cache  --detailed-report` to `parcel build <yourfiles>`

## License

MIT © [bung87]()


[npm-image]: https://badge.fury.io/js/parcel-plugin-esbuild.svg
[npm-url]: https://npmjs.org/package/parcel-plugin-esbuild
[travis-image]: https://travis-ci.com/bung87/parcel-plugin-esbuild.svg?branch=main
[travis-url]: https://travis-ci.com/bung87/parcel-plugin-esbuild
[daviddm-image]: https://david-dm.org/bung87/parcel-plugin-esbuild.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bung87/parcel-plugin-esbuild
