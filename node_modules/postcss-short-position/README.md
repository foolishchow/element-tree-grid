# Shorthand Position [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Shorthand Position] is a [PostCSS] plugin that lets you to define edges inside the position property in CSS.

```css
/* before */

.banner {
    position: fixed 0 0 *;
}

/* after */

.banner {
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
}
```

Edges follow the [1-to-4 syntax] and become `top`, `right`, `bottom`, and `left` properties. An asterisk (`*`) indicates that the edge is to be skipped.

## Usage

Follow these steps to use [Shorthand Position].

Add [Shorthand Position] to your build tool:

```bash
npm install postcss-short-position --save-dev
```

#### Node

```js
require('postcss-short-position')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Shorthand Position] as a PostCSS plugin:

```js
postcss([
    require('postcss-short-position')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Shorthand Position] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short-position')({ /* options */ })
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

Enable [Shorthand Position] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short-position')({ /* options */ })
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

Specifies a prefix to be surrounded by dashes before the declaration (e.g. `-x-position`).

[1-to-4 syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[ci]: https://travis-ci.org/jonathantneal/postcss-short-position
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short-position.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Shorthand Position]: https://github.com/jonathantneal/postcss-short-position
