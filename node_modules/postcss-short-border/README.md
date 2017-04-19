# Shorthand Border [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Shorthand Border] is a [PostCSS] plugin that lets you to creatively define multiple edges on border properties in CSS.

```css
/* before */

.foo {
    border: 1px 2px #343434;
}

.bar {
    border-width: * 1px;
}

.qux {
    border-color: #ee9933 . #996633;
}

/* after */

.foo {
    border-width: 1px 2px;
    border-color: #343434;
}

.bar {
    border-left-width: 1px;
    border-right-width: 1px;
}

.qux {
    border-color: #ee9933 #ee9933 #996633;
}
```

Border edges follow the [1-to-4 syntax] to become `border-top-`, `border-right-`, `bottom-bottom-`, and `border-left-` properties. An asterisk (`*`) indicates that the edge is to be skipped, while a dot (`.`) indicates that a previous edge should be repeated. For more advanced usages, two dots reference the edge before last, while three dots represents the first edge.

## Usage

Follow these steps to use [Shorthand Border].

Add [Shorthand Border] to your build tool:

```bash
npm install postcss-short-border --save-dev
```

#### Node

```js
require('postcss-short-border')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Shorthand Border] as a PostCSS plugin:

```js
postcss([
    require('postcss-short-border')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Shorthand Border] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short-border')({ /* options */ })
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

Enable [Shorthand Border] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short-border')({ /* options */ })
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

Specifies a prefix to be surrounded by dashes before the declaration (e.g. `-x-border`).

[1-to-4 syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[ci]: https://travis-ci.org/jonathantneal/postcss-short-border
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short-border.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Shorthand Border]: https://github.com/jonathantneal/postcss-short-border
