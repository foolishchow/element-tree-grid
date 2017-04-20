# Shorthand Font-Size [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Shorthand Font-Size] is a [PostCSS] plugin that extends the `font-size` property so that `line-height` may be set by the second value.

```css
/* before */

h1 {
    font-size: 125% 1.5;
}

/* after */

h1 {
    font-size: 125%;
    line-height: 1.5;
}
```

## Usage

Follow these steps to use [Shorthand Font-Size].

Add [Shorthand Font-Size] to your build tool:

```bash
npm install postcss-short-font-size --save-dev
```

#### Node

```js
require('postcss-short-font-size')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Shorthand Font-Size] as a PostCSS plugin:

```js
postcss([
    require('postcss-short-font-size')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Shorthand Font-Size] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short-font-size')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Shorthand Font-Size] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short-font-size')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

#### `prefix`

Type: `String`  
Default: `null`

Specifies a prefix to be surrounded by dashes before the declaration (e.g. `-x-font-size`).

[ci]: https://travis-ci.org/jonathantneal/postcss-short-font-size
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short-font-size.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Shorthand Font-Size]: https://github.com/jonathantneal/postcss-short-font-size
