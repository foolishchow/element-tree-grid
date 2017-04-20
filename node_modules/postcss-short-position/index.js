var postcss = require('postcss');

module.exports = postcss.plugin('postcss-short-position', function (opts) {
	var prefix = opts && opts.prefix ? '-' + opts.prefix + '-' : '';
	var name   = 'position';
	var match  = /^(inherit|initial|unset|absolute|fixed|relative|static|sticky|var\(.*\))$/;

	return function (css) {
		css.walkDecls(prefix + name, function (decl) {
			var edge = [];
			var position;

			if (prefix) decl.prop = name;

			postcss.list.space(decl.value).forEach(function (value) {
				if (!position && match.test(value)) position = value;
				else edge.push(value);
			});

			if (edge.length) {
				if (!edge[1]) edge[1] = edge[0];
				if (!edge[2]) edge[2] = edge[0];
				if (!edge[3]) edge[3] = edge[1];

				if (edge[0] !== '*') decl.cloneBefore({ prop: 'top',    value: edge[0] });
				if (edge[1] !== '*') decl.cloneBefore({ prop: 'right',  value: edge[1] });
				if (edge[2] !== '*') decl.cloneBefore({ prop: 'bottom', value: edge[2] });
				if (edge[3] !== '*') decl.cloneBefore({ prop: 'left',   value: edge[3] });

				if (position) decl.value = position;
				else decl.remove();
			}
		});
	};
});
