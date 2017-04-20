# rollup-plugin-url

Inline import files as data-URIs, or copy them to output

## Install

```sh
npm i --save-dev rollup-plugin-url
```

## Usage

```js
import {rollup} from "rollup"
import url from "rollup-plugin-url"

const writeoptions = {dest: "output/output.js"}
const plugin = url({
  limit: 10 * 1024, // inline files < 10k, copy files > 10k
  include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
})

rollup({
  entry: "main.js",
  plugins: [plugin],
})
.then(bundle => bundle.write(writeoptions))
.then(() => plugin.write(writeoptions))
```

## Options

### limit

Optional. Type: `number`

This is the file size limit to inline files. If files exceed this limit, they
will be copied instead to the destination folder and the hashed filename will
be given instead.

### include / exclude

Optional. Type: a minimatch pattern, or array of minimatch patterns

These patterns determine which files are inlined. Defaults to .svg, .png, .jpg
and .gif files.

### publicPath

Optional. Type: `string`

The `publicPath` will be added in front of file names when they are not inlined
but copied.

# License

LGPL-3.0
