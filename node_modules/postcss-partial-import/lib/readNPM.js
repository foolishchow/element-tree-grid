var resolvePackage = require('resolve');
var readCSS        = require('./readCSS');

// Promise the NPM package is read and processed
module.exports = function readNPM(link, encoding, processor, resolvedDirs) {
	// Promise the package is found
	var packagePromise = new Promise(function (resolve, reject) {
		resolvePackage(link, {
			paths: resolvedDirs,
			packageFilter: function (pkg) {
				// whether package has a style property
				var hasStyle = pkg.style;

				if (hasStyle) {
					// set package source
					pkg.main = pkg.style;
				} else {
					// matching expression
					var matchEndingCSS = /\.css$/;

					// whether package source is a CSS file
					var isCSS = matchEndingCSS.test(pkg.main);

					if (!isCSS) {
						// set default CSS file
						pkg.main = 'index.css';
					}
				}

				return pkg;
			}
		}, function (error, result) {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});

	// Promise the package is read and processed
	var readPromise = packagePromise.then(function (file) {
		return readCSS(file, encoding, processor);
	});

	return readPromise;
};
