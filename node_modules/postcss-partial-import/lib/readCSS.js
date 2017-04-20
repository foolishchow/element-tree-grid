var fs = require('fs-promise');

// Promise the file is read and processed
module.exports = function readCSS(file, encoding, processor) {
	// Promise the file is read
	var readPromise = fs.readFile(file, {
		enoding: encoding
	});

	// Promise the contents of the file are processed
	var processPromise = readPromise.then(function (contents) {
		return processor.process(contents, {
			from: file
		});
	});

	return processPromise;
};
