# Shorthand Spacing [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Shorthand Spacing] is a [PostCSS] plugin that lets you write shorthand margin and padding properties while omitting edges in CSS.

```css
/* before */

section {
    margin: 1em *;
}

/* after */

section {
    margin-top: 1em;
    margin-bottom: 1em;
}
```

Edges follow the [1-to-4 syntax] and become `top`, `right`, `bottom`, and `left` properties. Asterisks indicate that the edge is skipped.

## Usage

Follow these steps to use [Shorthand Spacing].

Add [Shorthand Spacing] to your build tool:

```bash
npm install postcss-short-spacing --save-dev
```

#### Node

```js
require('postcss-short-spacing')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Shorthand Spacing] as a PostCSS plugin:

```js
postcss([
    require('postcss-short-spacing')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Shorthand Spacing] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short-spacing')({ /* options */ })
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

Enable [Shorthand Spacing] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short-spacing')({ /* options */ })
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

Specifies a prefix to be surrounded by dashes before the declarations (e.g. `-x-margin` or `-x-padding`).

[1-to-4 syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[ci]: https://travis-ci.org/jonathantneal/postcss-short-spacing
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short-spacing.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Shorthand Spacing]: https://github.com/jonathantneal/postcss-short-spacing
