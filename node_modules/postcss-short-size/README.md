# Shorthand Size

<a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="80" height="80" align="right"></a>

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Shorthand Size] lets you use the shorthand `size`, `min-size`, and `max-size` properties in CSS. They follow the [1-to-2 syntax] to become `width` and `height` equivalent properties.

```css
/* before */

.container {
	size: 400px 300px;
}

/* after */

.container {
	width: 400px;
	height: 300px;
}
```

An asterisk indicates that one length is being skipped.

```css
/* before */

.header {
	min-size: * 2.5em;
}

/* after */

.header {
	height: 2.5em;
}
```

An aspect ratios indicates the relationship of one length to the other.

```css
/* before */

.media {
	size: 16/9 1080px;
}

.figure {
	size: 400px 4/3;
}

/* after */

.media {
	width: 1920px;
	height: 1080px;
}

.figure {
	width: 400px;
	height: 300px;
}
```

## Usage

Add [Shorthand Size] to your build tool:

```bash
npm install postcss-short-size --save-dev
```

#### Node

```js
require('postcss-short-size').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Shorthand Size] as a PostCSS plugin:

```js
postcss([
	require('postcss-short-size')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Shorthand Size] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-short-size')({ /* options */ })
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

Enable [Shorthand Size] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-short-size')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

## Options

#### `prefix`

Type: `String`  
Default: `null`

Specifies a prefix to be surrounded by dashes before the declaration (e.g. `-x-size`).

[ci]:      https://travis-ci.org/jonathantneal/postcss-short-size
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-short-size.svg
[npm]:     https://www.npmjs.com/package/postcss-short-size
[npm-img]: https://img.shields.io/npm/v/postcss-short-size.svg

[1-to-2 syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Shorthand Size]: https://github.com/jonathantneal/postcss-short-size
