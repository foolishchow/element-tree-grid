# PostCSS css-reset [![Build Status][travis-img]][travis]

[PostCSS] plugin to help you to reset your css via at-rules.

## Syntax

### reset-global

*reset style is dependent on [normalize.css] and combined with best practice.*

`@reset-global: [pc|mobile]`;

```css
/* before */
@reset-global pc;

/* after */
html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
}
body {
    margin: 0
}
article, aside, details, figcaption, figure, footer, header, main, menu, nav, section, summary {
    display: block
}
audio,
canvas,
progress,
video {
    display: inline-block
}
audio:not([controls]) {
    display: none;
    height: 0
}
progress {
    vertical-align: baseline
}
template, [hidden] {
    display: none
}
a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects
}
a:active,
a:hover {
    outline-width: 0
}
abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted
}
b,
strong {
    font-weight: inherit
}
b,
strong {
    font-weight: bolder
}
dfn {
    font-style: italic
}
h1 {
    font-size: 2em;
    margin: 0.67em 0
}
mark {
    background-color: #ff0;
    color: #000
}
small {
    font-size: 80%
}
sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
}
sub {
    bottom: -0.25em
}
sup {
    top: -0.5em
}
img {
    border-style: none
}
svg:not(:root) {
    overflow: hidden
}
code,
kbd,
pre,
samp {
    font-family: monospace, monospace;
    font-size: 1em
}
figure {
    margin: 1em 40px
}
hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible
}
button,
input,
optgroup,
select,
textarea {
    color: inherit;
    font: inherit;
    margin: 0;
    vertical-align: middle
}
optgroup {
    font-weight: bold
}
button,
input {
    overflow: visible
}
button,
select {
    text-transform: none
}
button, html [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: button
}
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0
}
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText
}
fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em
}
legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal
}
textarea {
    overflow: auto;
    resize: none;
    vertical-align: top
}
input,
select,
textarea {
    outline: 0
}
[disabled] {
    cursor: default
}
[type="checkbox"],
[type="radio"] {
    box-sizing: border-box;
    padding: 0
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
    height: auto
}
[type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px
}
[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none
}
input::-moz-placeholder,
textarea::-moz-placeholder {
    color: $colorPlaceholder
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: $colorPlaceholder
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: $colorPlaceholder
}
input::-ms-clear,
input::-ms-reveal {
    display: none
}
::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit
}
table {
    border-collapse: collapse;
    border-spacing: 0
}
td,
th {
    padding: 0
}
h1, h2, h3, h4, h5, h6, p, figure, form, blockquote {
    margin: 0
}
ul, ol, li, dl, dd {
    margin: 0;
    padding: 0
}
ul, ol {
    list-style: none outside none
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal
}
```

```css
/* before */
@reset-global mobile;

/* after */
html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    height: 100%
}
body {
    margin: 0;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
    display: block
}
audio:not([controls]) {
    display: none;
    height: 0
}
progress {
    vertical-align: baseline
}
template, [hidden] {
    display: none
}
a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    text-decoration: none
}
a:active,
a:hover {
    outline-width: 0
}
abbr[title] {
    text-decoration: underline;
    text-decoration: underline dotted
}
b,
strong {
    font-weight: bolder
}
dfn {
    font-style: italic
}
small {
    font-size: 80%
}
sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
}
sup {
    top: -0.5em
}
sub {
    bottom: -0.25em
}
img {
    border-style: none
}
svg:not(:root) {
    overflow: hidden
}
code,
kbd,
pre,
samp {
    font-family: monospace, monospace;
    font-size: 1em
}
pre {
    overflow: auto;
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word
}
button,
input,
optgroup,
select,
textarea {
    color: inherit;
    font: inherit;
    margin: 0;
    vertical-align: middle
}
button, input, input {
    overflow: visible
}
button,
select {
    text-transform: none
}
button, html [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: button
}
[disabled] {
    cursor: default
}
[type="checkbox"],
[type="radio"] {
    box-sizing: border-box;
    padding: 0
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
    height: auto
}
[type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px
}
[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none
}
::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit
}
textarea {
    overflow: auto;
    resize: none;
    vertical-align: top
}
optgroup {
    font-weight: bold
}
input,
select,
textarea {
    outline: 0
}
textarea,
input {
    -webkit-user-modify: read-write-plaintext-only
}
input::-ms-clear,
input::-ms-reveal {
    display: none
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: inherit;
    opacity: 0.54
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54
}
table {
    border-collapse: collapse;
    border-spacing: 0
}
td,
th {
    padding: 0
}
h1, h2, h3, h4, h5, h6, p, figure, form, blockquote {
    margin: 0
}
ul, ol, li, dl, dd {
    margin: 0;
    padding: 0
}
ul, ol {
    list-style: none outside none
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
    line-height: 2
}
* {
    box-sizing: border-box
}
```

### reset-nested
`@reset-nested: [tabel|tabel-cell|list|font|boxModel]`;

```css
/* before */
.table {
  @reset-nested tabel;
}
.table th,
.table td {
  @reset-nested tabel-cell;
}
ul, ol {
  @reset-nested list;
}
.regular-font {
  @reset-nested font;
}
.box {
  @reset-nested boxModel;
}

/* after */
.table {
  border-collapse: collapse;
  border-spacing: 0;
  vertical-align: middle;
}
.table th,
.table td {
  background-color: #fff;
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
  margin: 0;
  padding: 0;
}
ul, ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
.regular-font {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
}
.box {
  margin: 0;
  padding: 0;
  width: auto;
  height: auto;
}
```

## Usage

Add [Postcss CSS Reset] to your build tool:

```bash
npm install postcss-css-reset --save-dev
```

#### Node

```js
require('postcss-css-reset').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Postcss CSS Reset] as a PostCSS plugin:

```js
postcss([
  require('postcss-css-reset')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Postcss CSS Reset] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-css-reset')({ /* options */ })
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

Enable [Postcss CSS Reset] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-css-reset')({ /* options */ })
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[PostCSS]: https://github.com/postcss/postcss
[Postcss CSS Reset]: https://github.com/baiyaaaaa/postcss-css-reset
[travis-img]: https://travis-ci.org/baiyaaaaa/postcss-css-reset.svg
[travis]: https://travis-ci.org/baiyaaaaa/postcss-css-reset
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[normalize.css]: https://github.com/necolas/normalize.css/
