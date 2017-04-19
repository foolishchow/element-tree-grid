var postcss = require('postcss');

var aspectRatioRE = /^([-+]?[0-9]*\.?[0-9]+)\/([-+]?[0-9]*\.?[0-9]+)$/;
var lengthRE = /^([-+]?0|[-+]?[0-9]*\.?[0-9]+)(%|\w+)$/;

module.exports = postcss.plugin('postcss-short-size', function (opts) {
	var prefix = opts && opts.prefix ? '-' + opts.prefix + '-' : '';

	var sizeDeclarationRE = new RegExp('^' + prefix + '(max-|min-)?size$');

	return function (css) {
		css.walkDecls(sizeDeclarationRE, function (decl) {
			var name = prefix ? decl.prop.slice(prefix.length, -4) : decl.prop.slice(0, -4);
			var size = postcss.list.space(decl.value);

			if (size.length) {
				var width  = size[0];
				var widthLength = width.match(lengthRE);
				var widthAspectRatio  = width.match(aspectRatioRE);

				var height = size[1] || size[0];
				var heightLength = height.match(lengthRE);
				var heightAspectRatio = height.match(aspectRatioRE);

				if (widthAspectRatio && heightLength) {
					width = heightLength[1] / widthAspectRatio[2] * widthAspectRatio[1] + heightLength[2];
				}

				if (heightAspectRatio && widthLength) {
					height = widthLength[1] / heightAspectRatio[1] * heightAspectRatio[2] + widthLength[2];
				}

				if (height !== '*') {
					decl.cloneAfter({
						prop:  name + 'height',
						value: height
					});
				}

				if (width !== '*') {
					decl.cloneAfter({
						prop:  name + 'width',
						value: width
					});
				}
			}

			decl.remove();
		});
	};
});
