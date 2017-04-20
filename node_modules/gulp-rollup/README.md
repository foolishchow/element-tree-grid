# gulp-rollup [![npm][npm-image]][npm-url] [![Dependency Status][david-image]][david-url] [![Build Status][travis-image]][travis-url]

This plugin allows [gulp](https://www.npmjs.com/package/gulp) to populate a virtual filesystem and feed it to the [Rollup](https://www.npmjs.com/package/rollup) ES6 module bundler.

**Note: This plugin is not appropriate for most use cases,** as it requires every file expected to be imported by Rollup to be loaded into memory preemptively. [rollup-stream](https://github.com/gulpjs/gulp/blob/master/docs/recipes/rollup-with-rollup-stream.md) is preferred for almost all purposes. If you want to transform/synthesize/alias/etc. the files Rollup processes, use Rollup plugins; if there's no Rollup plugin to do what you want, try the gulp-to-Rollup plugin adapter, [rollup-plugin-gulp](https://www.npmjs.com/package/rollup-plugin-gulp). If you really need to synthesize your files in gulp, go ahead and use gulp-rollup&mdash;that's what it's made for.

## Install

``` bash
npm install --save-dev gulp-rollup
```

## Usage

``` js
var gulp       = require('gulp'),
    rollup     = require('gulp-rollup');

gulp.task('bundle', function() {
  gulp.src('./src/**/*.js')
    // transform the files here.
    .pipe(rollup({
      // any option supported by Rollup can be set here.
      entry: './src/main.js'
    }))
    .pipe(gulp.dest('./dist'));
});
```

## Usage with sourcemaps

``` js
var gulp       = require('gulp'),
    rollup     = require('gulp-rollup'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('bundle', function() {
  gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
      // transform the files here.
      .pipe(rollup({
        entry: './src/main.js'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});
```

## Multiple entry points

If an array of strings is passed into `options.entry`, a separate bundle will be rolled up from each entry point. They will be processed in parallel and output in no particular order. As usual, each bundle will have the same path as the associated entry file.

In addition, a Promise that resolves to a string or array of strings can be passed into `options.entry`. This is to make it more convenient to use asynchronous methods to locate entry files.

## Options

### `options.rollup`

In addition to [the standard Rollup options](https://github.com/rollup/rollup/wiki/JavaScript-API), gulp-rollup supports `options.rollup`, allowing you to use an older, newer, or custom version of Rollup by passing in the module like so:

``` js
gulp.src('./src/**/*.js')
  .pipe(rollup({
    rollup: require('rollup'),
    entry: './src/main.js'
  }))
  //...
```

### `options.allowRealFiles`

If `options.allowRealFiles` is set to true, gulp-rollup will break the gulp plugin guidelines just for you and allow Rollup to read files directly from the filesystem when a file with a matching name isn't found in the gulp stream. You could use this to weasel your way out of having to use rollup-stream, but that would make you a terrible person.

### `options.impliedExtensions`

By default, gulp-rollup will mimic Rollup by adding a .js extension to imports if necessary. You can customize this behavior by setting `options.impliedExtensions` to an array of extensions, like `['.js', '.es', '.jsx']`. If `options.impliedExtensions` is set to `false` or an empty array, file extensions in imports will be treated as mandatory.

### `options.separateCaches`

If `options.separateCaches` is supplied, it should be an object with property names corresponding to entry files. For each of those entry files, `options.cache` will be overridden with the corresponding property value. This is most useful in conjunction with the `'bundle'` event:

```js
var gulp       = require('gulp'),
    rollup     = require('gulp-rollup');

var caches = {};
gulp.task('bundle', function() {
  gulp.src('./src/**/*.js')
    .pipe(rollup({
      entry: ['./src/main1.js', './src/main2.js'],
      separateCaches: caches
    }))
    .on('bundle', function(bundle, name) {
      caches[name] = bundle;
    })
    .pipe(gulp.dest('./dist'));
});
```

### `options.generateUnifiedCache`

If `options.generateUnifiedCache` is set to true, gulp-rollup will try to construct a cache representing every file imported by any entry point, to be passed into future Rollup invocations (thus obviating the need for `options.separateCaches`) and deliver it via the `'unifiedcache'` event. This should always work as long as all of the plugins you use have deterministic output. Since the internal structure of Rollup's cache objects can't be expected to remain stable, this option isn't guaranteed to work if you specify an `options.rollup`.

tl;dr: It works like this:

```js
var gulp       = require('gulp'),
    rollup     = require('gulp-rollup');

var cache;
gulp.task('bundle', function() {
  gulp.src('./src/**/*.js')
    .pipe(rollup({
      entry: ['./src/main1.js', './src/main2.js'],
      cache: cache,
      generateUnifiedCache: true
    }))
    .on('unifiedcache', function(unifiedCache) {
      cache = unifiedCache;
    })
    .pipe(gulp.dest('./dist'));
});
```

[npm-url]: https://npmjs.org/package/gulp-rollup
[npm-image]: https://img.shields.io/npm/v/gulp-rollup.svg
[david-url]: https://david-dm.org/mcasimir/gulp-rollup
[david-image]: https://img.shields.io/david/mcasimir/gulp-rollup/master.svg
[travis-url]: https://travis-ci.org/mcasimir/gulp-rollup
[travis-image]: https://img.shields.io/travis/mcasimir/gulp-rollup/master.svg
