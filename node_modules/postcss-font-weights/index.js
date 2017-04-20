var postcss = require('postcss');
var weights = require('css-font-weight-names');
var matches = new RegExp('(^|\\s)(' + Object.keys(weights).join('|') + ')(\\s|$)');

module.exports = postcss.plugin('postcss-font-weights', function () {
	return function (css) {
		css.walkDecls(/^font(-weight)?$/, function (decl) {
			if (matches.test(decl.value)) {
				decl.value = decl.value.replace(matches, function (all, before, value, after) {
					return before + weights[value] + after;
				});
			}
		});
	};
});
