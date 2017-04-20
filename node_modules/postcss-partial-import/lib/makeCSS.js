var fs = require('fs-promise');

// Promise a new CSS is generated
module.exports = function makeCSS(file, processor) {
	// Promise the file is created
	var ensurePromise = fs.ensureFile(file);

	// Promise an empty string is processed (just in case)
	var processPromise = ensurePromise.then(function () {
		return processor.process('', {
			from: file
		});
	});

	return processPromise;
};
