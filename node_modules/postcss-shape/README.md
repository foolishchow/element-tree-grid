# PostCSS Shape [![Build Status][travis-img]][travis]

[PostCSS] plugin to draw basic shape with specified syntax in css rule.

## Syntax

###rect
`rect: [width] [height] [background-color]`

```css
/* before */
.rect-a {
  rect: 30px 50px #ff0;
}
.rect-b {
  rect: 30px * #ff0;
}

/* after */
.rect-a {
  width: 30px;
  height: 50px;
  background-color: #ff0;
}
.rect-b {
  width: 30px;
  background-color: #ff0;
}
```

###circle
`circle: [diameter] [background-color]`

```css
/* before */
.circle-a {
  circle: 50px #ff0;
}
.circle-b {
  circle: 50px *;
}

/* after */
.circle-a {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff0;
}
.circle-b {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
```

###triangle
`triangle: [size] [direction] [color]`

```css
/* before */
.triangle-a {
  triangle: 5px top #ff0;
}

/* after */
.triangle-a {
  display: inline-block;
  width: 0;
  height: 0;
  border: solid transparent;
  border-width: 5px;
  border-bottom-color: #ff0;
}
```

*can not ignore any value in triangle*

## Usage

Add [Postcss Shape] to your build tool:

```bash
npm install postcss-shape --save-dev
```

#### Node

```js
require('postcss-shape').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Postcss Shape] as a PostCSS plugin:

```js
postcss([
  require('postcss-shape')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Postcss Shape] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-shape')({ /* options */ })
    ])
  ).pipe(
    gulp.dest('.')
  );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Postcss Shape] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-shape')({ /* options */ })
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[PostCSS]: https://github.com/postcss/postcss
[Postcss Shape]: https://github.com/baiyaaaaa/postcss-shape
[travis-img]:  https://travis-ci.org/baiyaaaaa/postcss-shape.svg
[travis]:      https://travis-ci.org/baiyaaaaa/postcss-shape
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
