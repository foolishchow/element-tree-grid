'use strict';

var fs = require('fs'),
    rollupPluginutils = require('rollup-pluginutils'),
    postcss = require('postcss');

function css(options) {
    if (options === void 0) options = {};

    var filter = rollupPluginutils.createFilter(options.include || ['**/*.css'], options.exclude);
    var styles = {};
    var dest = options.output;
    var changes = 0;

    return {
        name: 'css',
        transform: function transform(code, id) {
            if (!filter(id)) {
                return
            }

            // When output is disabled, the stylesheet is exported as a string
            if (options.output === false) {
                return {
                    code: 'export default ' + JSON.stringify(code),
                    map: { mappings: '' }
                }
            }

            // Keep track of every stylesheet
            // Check if it changed since last render
            if (styles[id] !== code && (styles[id] || code)) {
                styles[id] = code;
                changes++;
            }
            if (options.postcss) {
                var opts = {
                    from: id,
                    to: id,
                    map: {
                        inline: false,
                        annotation: false
                    }
                    // ,
                    // parser: options.parser
                };
                return postcss(options.postcss || [])
                    .process(code, opts)
                    .then(result => {
                        var code =  result.css;
                        const map = '';
                        styles[id] = code;
                        return '';
                    });
            } else {
                return ''
            }

        },
        ongenerate: function ongenerate(opts, rendered) {
            // No stylesheet needed
            if (!changes || options.output === false) {
                return
            }
            changes = 0;
            var prefix = process.cwd();
            // Combine all stylesheets
            var css = '';
            for (var id in styles) {
                var url = id.replace(prefix, '').replace(/^\//, '')
                    .replace(/\.vue\.\d{0,1}\.vue\.component\.css/, '.vue');
                css += `/*  ${url}  start */\n`
                css += styles[id] || '';
                css += `\n/*  ${url}  end */\n`;
            }

            // Emit styles through callback
            if (typeof options.output === 'function') {
                options.output(css, styles);
                return
            }

            if (typeof dest !== 'string') {
                // Don't create unwanted empty stylesheets
                if (!css.length) {
                    return
                }

                // Guess destination filename
                dest = opts.dest || 'bundle.js';
                if (dest.endsWith('.js')) {
                    dest = dest.slice(0, -3);
                }
                dest = dest + '.css';
            }

            // Emit styles to file
            fs.writeFile(dest, css, function(err) {
                if (err) {
                    throw err
                }
                console.log(green(dest), getSize(css.length));
            });
        }
    }
}

function green(text) {
    return '\u001b[1m\u001b[32m' + text + '\u001b[39m\u001b[22m'
}

function getSize(bytes) {
    return bytes < 10000 ? bytes.toFixed(0) + ' B' : bytes < 1024000 ? (bytes / 1024).toPrecision(3) + ' kB' : (bytes / 1024 / 1024).toPrecision(4) + ' MB'
}

module.exports = css;
