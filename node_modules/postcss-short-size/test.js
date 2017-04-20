var tests = {
	'postcss-short-size': {
		'basic': {
			message: 'supports standard size'
		},
		'basic:w-prefix': {
			message: 'ignores standard size with prefix',
			options: {
				prefix: 'x'
			}
		},
		'prefixed': {
			message: 'ignores prefixed size'
		},
		'prefixed:w-prefix': {
			message: 'supports prefixed size with prefix',
			options: {
				prefix: 'x'
			}
		}
	}
};

var dir   = './test/';

var fs      = require('fs');
var path    = require('path');
var plugin  = require('./');
var test    = require('tape');

Object.keys(tests).forEach(function (name) {
	var parts = tests[name];

	test(name, function (t) {
		var fixtures = Object.keys(parts);

		t.plan(fixtures.length * 2);

		fixtures.forEach(function (fixture) {
			var message    = parts[fixture].message;
			var options    = parts[fixture].options || {};
			var warning    = parts[fixture].warning || 0;
			var warningMsg = message + ' (# of warnings)';

			var baseName   = fixture.split(':')[0];
			var testName   = fixture.split(':').join('.');

			var inputPath  = path.resolve(dir + baseName + '.css');
			var expectPath = path.resolve(dir + testName + '.expect.css');

			var inputCSS = '';
			var expectCSS = '';

			options.from = inputPath;

			try {
				inputCSS = fs.readFileSync(inputPath,  'utf8');
			} catch (error) {
				fs.writeFileSync(inputPath, inputCSS);
			}

			try {
				expectCSS = fs.readFileSync(expectPath,  'utf8');
			} catch (error) {
				fs.writeFileSync(expectPath, expectCSS);
			}

			plugin.process(inputCSS, options).then(function (result) {
				var actualCSS = result.css;

				t.equal(actualCSS, expectCSS, message);

				t.equal(result.warnings().length, warning, warningMsg);
			});
		});
	});
});
