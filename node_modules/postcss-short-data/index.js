var postcss = require('postcss');

module.exports = postcss.plugin('postcss-short-data', function () {
	return function (css) {
		css.walkRules(function (rule) {
			rule.selector = rule.selector.replace(/\[-([^\]])/, '[data-$1');
		});
	};
});
