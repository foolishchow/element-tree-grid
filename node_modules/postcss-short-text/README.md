# Short Text [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Short Text] is a [PostCSS] plugin that lets you use a shorthand `text` property in CSS.

```css
/* before */

section {
    text: bold center uppercase dimgrey 1.25em 1.5 .05em;
}

article {
    text: 1.25em * .05em;
}

/* after */

section {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: dimgrey;
    font-size: 1.25em;
    line-height: 1.5;
    letter-spacing: .05em;
}

article {
    font-size: 1.25em;
    letter-spacing: .05em;
}
```

Properties are matched into groups that may be written in any order. Once a property is matched to a group, other properties from that group must then be written before properties of another group. Asterisks indicate that an individual property in a group should be skipped. The groups include:

- `color`
- `font-style`, `font-variant`, `font-weight`, `font-stretch`
- `text-decoration`, `text-align`, `text-rendering`, `text-transform`
- `white-space`
- `font-size`, `line-height`, `letter-spacing`, `word-spacing`

## Usage

Follow these steps to use [Short Text].

Add [Short Text] to your build tool:

```bash
npm install postcss-short-text --save-dev
```

#### Node

```js
require('postcss-short-text')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Short Text] as a PostCSS plugin:

```js
postcss([
    require('postcss-short-text')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Short Text] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short-text')({ /* options */ })
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

Enable [Short Text] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short-text')({ /* options */ })
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

Specifies a prefix to be surrounded by dashes before the declaration (e.g. `-x-text`).

[ci]: https://travis-ci.org/jonathantneal/postcss-short-text
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short-text.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Short Text]: https://github.com/jonathantneal/postcss-short-text
