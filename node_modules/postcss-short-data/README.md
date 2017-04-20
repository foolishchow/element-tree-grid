# Shorthand Data

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Shorthand Data] lets you write shorthand data attribute selectors in CSS.

```css
/* before */

nav a[:active] {
	background: #f3f3f3;
}

button[:target~="main"] {
	background: #334332;
}

/* after */

nav a[data-active] {
	background: #f3f3f3;
}

button[data-target~="main"] {
	background: #334332;
}
```

## Usage

Add [Shorthand Data] to your build tool:

```bash
npm install postcss-short-data --save-dev
```

#### Node

```js
require('postcss-short-data').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Shorthand Data] as a PostCSS plugin:

```js
postcss([
	require('postcss-short-data')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Shorthand Data] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./css/src/*.css').pipe(
		postcss([
			require('postcss-short-data')({ /* options */ })
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

Enable [Shorthand Data] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			processors: [
				require('postcss-short-data')({ /* options */ })
			]
		},
		dist: {
			src: 'css/*.css'
		}
	}
});
```

[ci]:      https://travis-ci.org/jonathantneal/postcss-short-data
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-short-data.svg
[npm]:     https://www.npmjs.com/package/postcss-short-data
[npm-img]: https://img.shields.io/npm/v/postcss-short-data.svg

[Gulp PostCSS]:  https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]:       https://github.com/postcss/postcss

[Shorthand Data]: https://github.com/jonathantneal/postcss-short-data
