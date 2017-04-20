# Partial Import

<img src="http://postcss.github.io/postcss/logo-leftp.svg" width="135" height="95" align="right" title="Philosopher’s stone, logo of PostCSS">

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Partial Import] inlines `@import` statements in CSS.

[Partial Import] allows partial imports [like Sass](#prefix). It finds stylesheets within [npm](https://www.npmjs.com/package/package) and [Bower](https://bower.io/search/) packages. It can even [generate](#generate) imports if they don’t already exist.

```css
/* before: foo/_bar.css */

html {
    background-color: #fafafa;
}

/* before: file.css */

@import "foo/bar";

/* after file.css */

html {
    background-color: #fafafa;
}
```

## Usage

Add [Partial Import] as a dependency:

```bash
npm install postcss-partial-import --save-dev
```

#### Node Usage

```js
require('postcss-partial-import')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS and CLI Usage

Add [PostCSS] as a dependency:

```bash
npm install postcss --save-dev
```

Use [Partial Import] as a PostCSS plugin:

```js
postcss([
    require('postcss-partial-import')({ /* options */ })
]);
```

Or, use [Partial Import] as a PostCSS plugin from the CLI:

```sh
postcss --use postcss-partial-import input.css

# or, use a json configuration
postcss --config my-postcss-config.json input.css
```

```json
{
  "use": ["postcss-partial-import"]
}
```

#### Gulp Usage

Add [Gulp PostCSS] as a dependency:

```bash
npm install gulp-postcss --save-dev
```

Use [Partial Import] in your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-partial-import')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt Usage

Add [Grunt PostCSS] as a dependency:

```bash
npm install grunt-postcss --save-dev
```

Use [Partial Import] in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-partial-import')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

#### `encoding`

Type: `String`  
Default: `utf8`

The character encoding of files being imported.

#### `extension`

Type: `String`  
Default: `.css`

The file extension appended to partials being imported.

#### `prefix`

Type: `String`  
Default: `_`

The leading characters prepended to partials being imported.

#### `generate`

Type: `Boolean`  
Default: `false`

Whether partials should be generated if they do not already exist.

#### `dirs`

Type: `Array`  
Default: `[]`

A list of alternate directories to find partials in.

#### `plugins`

Type: `Array`  
Default: `[]`

A list of PostCSS plugins to run over individual partials.

#### `addDependencyTo`

Type: `function`  
Default: `null`

To pass CSS @import files to a compiler (such as webpack), which would otherwise not know which CSS files to watch for browser reloading.

*Example*
```javascript
// webpack.config.js
postcss: function(webpack) {
    return [
        require('postcss-partial-import')({
        	addDependencyTo: webpack
        })
    ];
}
```

#### `resolve`

Type: `function`
Default: `null`

Overrides the default function for resolving paths. The function will fall back to the default resolving behaviour if nothing is returned. The function will receive four arguments:

- `id`: The `@import` string to be resolved
- `dir`: The directory of the source file
- `options`: All options passed in to the plugin

[ci]:      https://travis-ci.org/jonathantneal/postcss-partial-import
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-partial-import.svg
[npm]:     https://www.npmjs.com/package/postcss-partial-import
[npm-img]: https://img.shields.io/npm/v/postcss-partial-import.svg

[Gulp PostCSS]:  https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]:       https://github.com/postcss/postcss

[Partial Import]: https://github.com/jonathantneal/postcss-partial-import
