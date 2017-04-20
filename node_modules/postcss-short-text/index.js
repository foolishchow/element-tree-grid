var assign  = require('object-assign');
var postcss = require('postcss');
var matches = [{
	'color': /^(\*|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|currentColor|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|inherit|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|#[0-9a-f]+|(hsl|rgb)a?\(.+\))$/i
}, {
	'font-style': /^(\*|var\(.+\)|inherit|italic|normal|oblique)$/i,
	'font-variant': /^(\*|var\(.+\)|all-petite-caps|all-small-caps|inherit|none|normal|oldstyle-nums|ordinal|petite-caps|slashed-zero|small-caps|stacked-fractions|titling-caps|unicase)$/i,
	'font-weight': /^(\*|var\(.+\)|100|200|300|400|500|600|700|800|900|black|bold|bolder|book|demibold|extrabold|extralight|heavy|inherit|light|lighter|medium|normal|regular|roman|semibold|thin|ultrabold|ultralight)$/i,
	'font-stretch': /^(\*|var\(.+\)|condensed|expanded|extra-condensed|extra-expanded|inherit|normal|semi-condensed|semi-expanded|ultra-condensed|ultra-expanded)$/i
}, {
	'text-decoration': /^(\*|var\(.+\)|blink|inherit|initial|line-through|none|overline|underline)$/i,
	'text-align': /^(\*|var\(.+\)|center|end|inherit|justify|left|match-parent|right|start|start-end)$/i,
	'text-rendering': /^(\*|var\(.+\)|auto|geometricPrecision|inherit|optimizeLegibility|optimizeSpeed)$/i,
	'text-transform': /^(\*|var\(.+\)|capitalize|full-width|inherit|lowercase|none|uppercase)$/i
}, {
	'white-space': /^(\*|var\(.+\)|inherit|normal|nowrap|pre|pre-line|pre-wrap)$/i
}, {
	'font-size': /^(\*|(calc|var)\(.+\)|inherit|initial|large|larger|medium|small|smaller|unset|x-large|x-small|xx-large|xx-small|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/i,
	'line-height': /^(\*|(calc|var)\(.+\)|inherit|initial|normal|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw)?)$/i,
	'letter-spacing': /^(\*|(calc|var)\(.+\)|inherit|initial|normal|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/i,
	'word-spacing': /^(\*|(calc|var)\(.+\)|inherit|initial|normal|unset|0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw))$/i
}];

module.exports = postcss.plugin('postcss-short-text', function (opts) {
	var name = opts && opts.prefix ? '-' + opts.prefix + '-text' : 'text';

	return function (css) {
		css.walkDecls(name, function (decl) {
			var values  = postcss.list.space(decl.value);
			var sources = matches.slice(0).map(function (source) {
				return assign({}, source);
			});

			values.forEach(function (value) {
				all: {
					var source;

					while (source = sources[0]) {
						source.state = source.state || 'skipped';

						for (var prop in source) {
							if (prop !== 'state' && source[prop].test(value)) {
								source.state = 'done';

								if (value !== '*') decl.cloneBefore({ prop: prop, value: value });

								delete source[prop];

								break all;
							}
						}

						if (source.state === 'done') {
							sources.splice(0, 1);
						} else if (source.state === 'skipped') {
							source.state = 'done';
							sources.push(sources.splice(0, 1)[0]);
						}
					}
				}
			});

			decl.remove();
		});
	};
});
