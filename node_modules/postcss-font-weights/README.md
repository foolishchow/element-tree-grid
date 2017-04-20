# Font Weights

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Font Weights] lets you use common font weights in your CSS.

```css
/* before */

body {
   font: light 100%/1.5;
}

.heading {
   font-weight: medium;
}

/* after */

body {
   font: 300 100%/1.5;
}

.heading {
   font-weight: 500;
}
```

Common font weights are found in the [Font Weight Numeric Values] section of the [W3C CSS Fonts Specification].

| Common Weight | Numeric Value |
| ------------- | ------------- |
| thin          | 100           |
| extralight    | 200           |
| ultralight    | 200           |
| light         | 300           |
| book          | 400           |
| normal        | 400           |
| regular       | 400           |
| roman         | 400           |
| medium        | 500           |
| semibold      | 600           |
| demibold      | 600           |
| bold          | 700           |
| extrabold     | 800           |
| ultrabold     | 800           |
| black         | 900           |
| heavy         | 900           |

These common font weights are converted to their numeric counterpart.

## Usage

Add [Font Weights] to your build tool:

```bash
npm install postcss-font-weights --save-dev
```

#### Node

```js
require('postcss-font-weights').process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Font Weights]: a PostCSS plugin:

```js
postcss([
    require('postcss-font-weights')()
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Font Weights] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-font-weights')()
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

Enable [Font Weights] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-font-weights')()
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

[ci]:      https://travis-ci.org/jonathantneal/postcss-font-weights
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-font-weights.svg
[npm]:     https://www.npmjs.com/package/postcss-font-weights
[npm-img]: https://img.shields.io/npm/v/postcss-font-weights.svg

[Font Weight Numeric Values]: http://www.w3.org/TR/css3-fonts/#font-weight-numeric-values
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[W3C CSS Fonts Specification]: http://www.w3.org/TR/css3-fonts/

[Font Weights]: https://github.com/jonathantneal/postcss-font-weights
