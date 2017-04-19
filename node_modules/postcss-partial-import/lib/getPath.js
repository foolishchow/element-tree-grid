var path = require('path');

// Resolved file path
module.exports = function getPath(id, dir, opts) {

	var link = path.resolve(dir, id);

	if (opts.resolve && typeof opts.resolve === 'function') {
		var resolved = opts.resolve(id, dir, opts);
		if (resolved) {
			link = resolved;
		}
	}

	// the extension of the path
	var extName = path.extname(link);

	if (extName) {
		return link;
	} else {
		// the normalized path which includes a prefix and suffix
		var normalizedPath = path.join(path.dirname(link), opts.prefix + path.basename(link) + opts.extension);

		return normalizedPath;
	}
};
