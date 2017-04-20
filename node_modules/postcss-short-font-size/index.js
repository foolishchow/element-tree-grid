var postcss = require('postcss');

module.exports = postcss.plugin('postcss-short-font-size', function (opts) {
	var prefix = opts && opts.prefix ? '-' + opts.prefix + '-' : '';
	var name   = 'font-size';

	return function (css) {
		css.walkDecls(prefix + name, function (decl) {
			if (prefix) decl.prop = name;

			var value = postcss.list.space(decl.value);

			if (value[0] === '*') decl.remove();
			else decl.value = value[0];

			if (value[1] && value[1] !== '*') decl.cloneAfter({ prop: 'line-height', value: value.slice(1).join(' ') });
		});
	};
});
