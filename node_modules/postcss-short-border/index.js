var postcss = require('postcss');

var borderColor = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|currentColor|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|inherit|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|#[0-9a-f]+|(color|hwb|hsla?|rgba?|var)\(.+\)|\*|\.+)$/i;
var borderStyle = /^(inherit|dashed|dotted|double|groove|hidden|inherit|inset|none|outset|ridge|solid|var\(.+\)|\*|\.+)$/i;
var borderWidth = /^(inherit|initial|normal|unset|[-+]?0|[-+]?[0-9]*\.?[0-9]+(%|ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmax|vmin|vw)|(calc|var)\(.+\)|\*|\.+)$/i;

var assign1to4 = function (edges, prop, decl) {
	if (!edges[0]) edges[0] = '*';

	if (/^\.+$/.test(edges[1])) edges[1] = edges[Math.max(1 - edges[1].length, 0)];
	if (/^\.+$/.test(edges[2])) edges[2] = edges[Math.max(2 - edges[2].length, 0)];
	if (/^\.+$/.test(edges[3])) edges[3] = edges[Math.max(3 - edges[3].length, 0)];

	if (!edges[1]) edges[1] = edges[0];
	if (!edges[2]) edges[2] = edges[0];
	if (!edges[3]) edges[3] = edges[1];

	if (edges[0] !== '*' && edges[1] !== '*' && edges[2] !== '*' && edges[3] !== '*') {
		if (edges.length === 4 && edges[3] === edges[1]) edges.splice(3, 1);
		if (edges.length === 3 && edges[2] === edges[0]) edges.splice(2, 1);
		if (edges.length === 2 && edges[1] === edges[0]) edges.splice(1, 1);

		decl.cloneBefore({ prop: 'border-' + prop, value: edges.join(' ') });
	} else {
		if (edges[0] !== '*') decl.cloneBefore({ prop: 'border-top-'    + prop, value: edges[0] });
		if (edges[1] !== '*') decl.cloneBefore({ prop: 'border-right-'  + prop, value: edges[1] });
		if (edges[2] !== '*') decl.cloneBefore({ prop: 'border-bottom-' + prop, value: edges[2] });
		if (edges[3] !== '*') decl.cloneBefore({ prop: 'border-left-'   + prop, value: edges[3] });
	}
};

module.exports = postcss.plugin('postcss-short-border', function (opts) {
	var prefix = opts && opts.prefix ? '-' + opts.prefix + '-' : '';

	return function (css) {
		css.walkDecls(function (decl) {
			if (decl.prop === prefix + 'border') {
				var colors = [];
				var styles = [];
				var widths = [];
				var last   = widths;

				if (prefix) decl.prop = 'border';

				postcss.list.space(decl.value).forEach(function (value) {
					if (last.length < 4 && (last === widths ? borderWidth : last === styles ? borderStyle : borderColor).test(value)) last.push(value);
					else if (widths.length < 4 && borderWidth.test(value)) last = widths.push(value) && widths;
					else if (styles.length < 4 && borderStyle.test(value)) last = styles.push(value) && styles;
					else if (colors.length < 4 && borderColor.test(value)) last = colors.push(value) && colors;
				});

				if (widths[0] === '*' || styles[0] === '*' || colors[0] === '*' || widths.length > 1 || styles.length > 1 || colors.length > 1) {
					assign1to4(widths, 'width', decl);
					assign1to4(styles, 'style', decl);
					assign1to4(colors, 'color', decl);

					decl.remove();
				}
			}

			var index = [prefix + 'border-color', prefix + 'border-width', prefix + 'border-style'].indexOf(decl.prop);

			if (index !== -1) {
				var prop = ['color', 'width', 'style'][index];

				if (prefix) decl.prop = 'border-' + prop;

				assign1to4(postcss.list.space(decl.value), prop, decl);

				decl.remove();
			}
		});
	};
});
