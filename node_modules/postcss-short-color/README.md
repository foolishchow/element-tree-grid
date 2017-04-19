# Shorthand Color [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Shorthand Color] is a [PostCSS] plugin that extends the `color` property so that `background-color` may be set by the second value.

```css
/* before */

header {
    color: #abccfc #212231;
}

/* after */

header {
    color: #abccfc;
    background-color: #212231;
}
```

## Usage

Follow these steps to use [Shorthand Color].

Add [Shorthand Color] to your build tool:

```bash
npm install postcss-short-color --save-dev
```

#### Node

```js
require('postcss-short-color')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Shorthand Color] as a PostCSS plugin:

```js
postcss([
    require('postcss-short-color')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Shorthand Color] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short-color')({ /* options */ })
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

Enable [Shorthand Color] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short-color')({ /* options */ })
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

Specifies a prefix to be surrounded by dashes before the declaration (e.g. `-x-color`).

[ci]: https://travis-ci.org/jonathantneal/postcss-short-color
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short-color.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Shorthand Color]: https://github.com/jonathantneal/postcss-short-color
