[PostCSS](https://github.com/postcss/postcss) plugin to transform SASS/compass color functions to more compatible CSS.

Inspired, and modified from, [postcss-color-function](https://github.com/postcss/postcss-color-function).

## Installation

```console
$ npm install git://github.com/adam-h/postcss-sass-color-functions.git
```

## Usage

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var sassColorFunctions = require("postcss-sass-color-functions")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(sassColorFunctions())
  .process(css)
  .css
```

Using this `input.css`:

```css
body {
  background-color: mix(#255073, #3c749e, 25%);
}

```

you will get:

```css
body {
  background-color: rgb(54, 107, 147);
}
```

Checkout [tests.js](tests.js) for examples.


### Currently Supported functions

 - `mix(one, two, weight)`
 - `rgba(color, alpha)`
 - `darken(color, amount)`
 - `lighten(color, amount)`
 - `tint(color, amount)`
 - `shade(color, amount)`
