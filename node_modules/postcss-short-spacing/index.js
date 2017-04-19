var postcss = require('postcss');

module.exports = postcss.plugin('postcss-short-spacing', function (opts) {
	var prefix = opts && opts.prefix ? '-' + opts.prefix + '-' : '';

	return function (css) {
		css.walkDecls(new RegExp('^' + prefix + '(margin|padding)$'), function (decl) {
			var name = prefix ? decl.prop.slice(prefix.length) : decl.prop;
			var edge = postcss.list.space(decl.value);

			if (edge.length && edge.indexOf('*') !== -1) {
				if (!edge[1]) edge[1] = edge[0];
				if (!edge[2]) edge[2] = edge[0];
				if (!edge[3]) edge[3] = edge[1];

				if (edge[0] !== '*') decl.cloneBefore({ prop: name + '-top',    value: edge[0] });
				if (edge[1] !== '*') decl.cloneBefore({ prop: name + '-right',  value: edge[1] });
				if (edge[2] !== '*') decl.cloneBefore({ prop: name + '-bottom', value: edge[2] });
				if (edge[3] !== '*') decl.cloneBefore({ prop: name + '-left',   value: edge[3] });

				decl.remove();
			} else if (prefix) decl.prop = name;
		});
	};
});
