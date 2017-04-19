# PostCSS Utils [![Build Status][travis-img]][travis]

[PostCSS] plugin to help you create functional fragments quickly via at-rules.

## Syntax

### ellipsis


`@utils-ellipsis [rows];`

```css
/* before */
.ellipsis {
  @utils-ellipsis;
}
.ellipsis2 {
  @utils-ellipsis 3;
}

/* after */
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ellipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
```

### clearfix
`@utils-clearfix;`

```css
/* before */
.clearfix {
  @utils-clearfix;
}

/* after */
.clearfix {
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: 
}
.clearfix:after {
    clear: both
}
```

### image replace text
`@utils-irt;`

```css
/* before */
.irt {
  @utils-irt;
}

/* after */
.irt {
  font: 0/0 none;
  text-shadow: none;
  color: transparent;
}
```

### user select
`@utils-user-select [none|text];`

```css
/* before */
.usn {
  @utils-user-select none;
}

/* after */
.usn {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
```

### disabled
`@utils-disabled [background-color] [border-color] [color];`

```css
/* before */
.disabled {
  @utils-disabled #ccc #f00 #333;
}

/* after */
.disabled {
  background-color: #ccc;
  border-color: #f00;
  color: #333;
  cursor: default;
  pointer-events: none;
}
```

### vertical center
`@utils-vertical-center;`

```css
/* before */
.vam-box {
  @utils-vertical-center;
}

/* after */
.vam-box {
}
.vam-box:after {
    display: inline-block;
    content: ;
    height: 100%;
    vertical-align: middle
}
```

## Usage

Add [Postcss Utils] to your build tool:

```bash
npm install postcss-utils --save-dev
```

#### Node

```js
require('postcss-utils').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Postcss Utils] as a PostCSS plugin:

```js
postcss([
  require('postcss-utils')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Postcss Utils] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-utils')({ /* options */ })
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

Enable [Postcss Utils] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-utils')({ /* options */ })
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[PostCSS]: https://github.com/postcss/postcss
[Postcss Utils]: https://github.com/baiyaaaaa/postcss-utils
[travis-img]: https://travis-ci.org/baiyaaaaa/postcss-utils.svg
[travis]: https://travis-ci.org/baiyaaaaa/postcss-utils
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
