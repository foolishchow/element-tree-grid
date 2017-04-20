# Short

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Short] lets you write styles more logically by extending shorthand properties in CSS.

Short has now been featured in **[Smashing Magazine]**! I hope all of these shorthands are useful and clear to first-time lookers. I hope they improve the readability of your stylesheets and save you development time along the way. Thank you so much for your support.

## Features

### Size

Write `width` and `height` together with the `size` property.

```css
/* before */

.icon {
    size: 48px;
}

/* after */

.icon {
    width: 48px;
    height: 48px;
}
```

### Margin and Padding

Avoid clobbering previous `margin` by using an asterisk, which indicates that an edge is skipped.

```css
/* before */

.frame {
    margin: * auto;
}

/* after */

.frame {
    margin-right: auto;
    margin-left: auto;
}
```

### Position

Write `top`, `right`, `bottom`, and `left` in the `position` property using the [clockwise syntax]. Just like before, an asterisk indicates that an edge is skipped.

```css
/* before */

.banner {
    position: fixed 0 0 *;
}

/* after */

.banner {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
}
```

### Color

Write `color` and `background-color` together.

```css
/* before */

.canvas {
    color: #abccfc #212231;
}

/* after */

.canvas {
    color: #abccfc;
    background-color: #212231;
}
```

### Border

Define multiple edges on `border` properties using the [clockwise syntax].

```css
/* before */

.container {
    border: 1px 2px #343434;
}

/* after */

.container {
    border-width: 1px 2px;
    border-color: #343434;
}
```

### Font-Size

Write `font-size` and `line-height` together.

```css
/* before */

.heading {
    font-size: 1.25em 2;
}

/* after */

.heading {
    font-size: 1.25em;
    line-height: 2;
}
```

### Font-Weight

Write `font-weight` using common names.

```css
/* before */

p {
    font-weight: light;
}

/* after */

p {
    font-weight: 300;
}
```

### Text

Keep all text properties together with the `text` property.

```css
/* before */

.section {
    text: dimgrey bold center uppercase 1.25em 1.5 .05em;
}

/* after */

.section {
    color: dimgrey;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.25em;
    line-height: 1.5;
    letter-spacing: .05em;
}
```

### Data Attributes

Set `data-` attributes with a shorter attribute selector.

```css
/* before */

.menu-item[-active] {
    background: #f3f3f3;
}

/* after */

.menu-item[data-active] {
    background: #f3f3f3;
}
```

## Plugins

[Short] is powered by the following plugins:

- [Shorthand Border](https://github.com/jonathantneal/postcss-short-border)
- [Shorthand Color](https://github.com/jonathantneal/postcss-short-color)
- [Shorthand Font-Size](https://github.com/jonathantneal/postcss-short-font-size)
- [Shorthand Position](https://github.com/jonathantneal/postcss-short-position)
- [Shorthand Size](https://github.com/jonathantneal/postcss-short-size)
- [Shorthand Spacing](https://github.com/jonathantneal/postcss-short-spacing)
- [Shorthand Text](https://github.com/jonathantneal/postcss-short-text)
- [Shorthand Data](https://github.com/jonathantneal/postcss-short-data)
- [Font Weights](https://github.com/jonathantneal/postcss-font-weights)

Some of these plugins have more features than are described here.

## Usage

Follow these steps to use [Short].

Add [Short] to your build tool:

```bash
npm install postcss-short --save-dev
```

#### Node

```js
require('postcss-short')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Short] as a PostCSS plugin:

```js
postcss([
    require('postcss-short')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Short] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-short')({ /* options */ })
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

Enable [Short] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-short')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

Each plugin’s options may be configured by targeting the plugin’s namespace. Any plugins may be disabled by giving them a `disable` property.

Example:
```js
require('postcss-short')({
    'font-size': {
        prefix: 'x'
    },
    'position': {
        disable: true
    }
})
```

[ci]:      https://travis-ci.org/jonathantneal/postcss-short
[ci-img]:  https://img.shields.io/travis/jonathantneal/postcss-short.svg
[npm]:     https://www.npmjs.com/package/postcss-short
[npm-img]: https://img.shields.io/npm/v/postcss-short.svg

[clockwise syntax]: https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#Tricky_edge_cases
[ci]: https://travis-ci.org/jonathantneal/postcss-short
[ci-img]: https://travis-ci.org/jonathantneal/postcss-short.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Short]: https://github.com/jonathantneal/postcss-short
[Smashing Magazine]: http://www.smashingmagazine.com/2015/12/introduction-to-postcss/#extendedshorthandpropertieswithpostcss-short
