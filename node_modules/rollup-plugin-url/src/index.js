import {createFilter} from "rollup-pluginutils"
import mime from "mime"
import crypto from "crypto"
import path from "path"
import fs from "fs"

const defaultInclude = [
  "**/*.svg",
  "**/*.png",
  "**/*.jpg",
  "**/*.gif",
]

export default function url(options = {}) {
  const {
    limit,
    include = defaultInclude,
    exclude,
    publicPath = "",
  } = options
  const filter = createFilter(include, exclude)

  const copies = Object.create(null)

  return {
    load(id) {
      if (!filter(id)) {
        return null
      }
      return Promise.all([
        promise(fs.stat, id),
        promise(fs.readFile, id),
      ]).then(([stats, buffer]) => {
        let data
        if (limit && stats.size > limit) {
          const hash = crypto.createHash("sha1")
            .update(buffer)
            .digest("hex")
            .substr(0, 16)
          const filename = hash + path.extname(id)
          data = `${publicPath}${filename}`
          copies[id] = filename
        } else {
          const mimetype = mime.lookup(id)
          const isSVG = mimetype === "image/svg+xml"
          data = isSVG
            ? encodeSVG(buffer)
            : buffer.toString("base64")
          const encoding = isSVG ? "" : ";base64"
          data = `data:${mimetype}${encoding},${data}`
        }
        return `export default "${data}"`
      })
    },
    write(options) {
      const base = path.dirname(options.dest)
      return Promise.all(Object.keys(copies).map(name => {
        const output = copies[name]
        return copy(name, path.join(base, output))
      }))
    },
  }
}

function promise(fn, ...args) {
  return new Promise((resolve, reject) =>
                     fn(...args, (err, res) =>
                        err ? reject(err) : resolve(res)))
}

function copy(src, dest) {
  return new Promise((resolve, reject) => {
    const read = fs.createReadStream(src)
    read.on("error", reject)
    const write = fs.createWriteStream(dest)
    write.on("error", reject)
    write.on("finish", resolve)
    read.pipe(write)
  })
}

// https://github.com/filamentgroup/directory-encoder/blob/master/lib/svg-uri-encoder.js
function encodeSVG(buffer) {
  return encodeURIComponent(buffer.toString("utf-8")
    // strip newlines and tabs
    .replace(/[\n\r]/gmi, "")
    .replace(/\t/gmi, " ")
    // strip comments
    .replace(/<!\-\-(.*(?=\-\->))\-\->/gmi, "")
    // replace
    .replace(/'/gmi, "\\i"))
    // encode brackets
    .replace(/\(/g, "%28").replace(/\)/g, "%29")
}
